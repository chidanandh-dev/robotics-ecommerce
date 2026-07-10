from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import stripe
import os
import uuid
import datetime

import models
import schemas
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/payments", tags=["payments"])

stripe_key = os.getenv("STRIPE_SECRET_KEY")
if stripe_key:
    stripe.api_key = stripe_key

@router.post("/create-checkout-session")
def create_checkout_session(order_req: schemas.OrderCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    if not order_req.items:
        raise HTTPException(status_code=400, detail="Cart items are required.")
    
    validated_items = []
    total = 0.0
    for cart_item in order_req.items:
        product = db.query(models.Product).filter(models.Product.id == cart_item.id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product not found: {cart_item.id}")
        
        qty = max(1, cart_item.quantity)
        validated_items.append({
            "product": product,
            "quantity": qty
        })
        total += product.price * qty
        
    total += 150 # shipping or flat fee
    
    order_items_json = [
        {
            "productId": item["product"].id,
            "name": item["product"].name,
            "quantity": item["quantity"],
            "price": item["product"].price
        } for item in validated_items
    ]
    
    new_order = models.Order(
        id=f"ord_{int(datetime.datetime.utcnow().timestamp()*1000)}_{uuid.uuid4().hex[:6]}",
        user_id=current_user.id,
        customer_email=current_user.email,
        items=order_items_json,
        total=total,
        status="pending_payment" if stripe_key else "demo_paid"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    client_url = os.getenv("CLIENT_URL", "http://localhost:5173")
    
    if not stripe_key:
        return {
            "url": f"{client_url}/checkout-success?demo=true&order={new_order.id}",
            "orderId": new_order.id,
            "demo": True
        }
        
    line_items = []
    for item in validated_items:
        line_items.append({
            "price_data": {
                "currency": "inr",
                "product_data": {
                    "name": item["product"].name,
                    "description": item["product"].shortDescription,
                },
                "unit_amount": int(round(item["product"].price * 100)),
            },
            "quantity": item["quantity"],
        })
        
    try:
        session = stripe.checkout.Session.create(
            mode="payment",
            payment_method_types=["card"],
            customer_email=current_user.email,
            line_items=line_items,
            success_url=f"{client_url}/checkout-success?session_id={{CHECKOUT_SESSION_ID}}&order={new_order.id}",
            cancel_url=f"{client_url}/checkout-cancel",
            metadata={
                "orderId": new_order.id,
                "userId": current_user.id
            }
        )
        return {"url": session.url, "orderId": new_order.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
