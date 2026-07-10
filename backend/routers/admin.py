from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import models
import schemas
from dependencies import get_db, get_admin_user

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_admin_user)):
    total_products = db.query(models.Product).count()
    total_orders = db.query(models.Order).count()
    total_users = db.query(models.User).count()
    total_messages = db.query(models.Message).count()
    
    # Calculate revenue
    orders = db.query(models.Order).all()
    revenue = sum(order.total for order in orders)
    
    return {
        "stats": {
            "totalProducts": total_products,
            "totalOrders": total_orders,
            "totalUsers": total_users,
            "totalMessages": total_messages,
            "revenue": revenue
        }
    }

@router.get("/orders")
def get_orders(db: Session = Depends(get_db), current_user: models.User = Depends(get_admin_user)):
    orders = db.query(models.Order).all()
    return {"orders": [schemas.Order.from_orm(o) for o in orders]}

@router.get("/messages")
def get_messages(db: Session = Depends(get_db), current_user: models.User = Depends(get_admin_user)):
    messages = db.query(models.Message).all()
    return {"messages": [schemas.Message.from_orm(m) for m in messages]}
