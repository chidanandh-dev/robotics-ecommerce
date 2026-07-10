from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
import uuid
import datetime

import models
import schemas
from dependencies import get_db, get_admin_user

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/")
def get_products(category: Optional[str] = None, featured: Optional[str] = None, search: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Product)
    
    if category:
        query = query.filter(models.Product.category == category)
    if featured == 'true':
        query = query.filter(models.Product.featured == True)
        
    products = query.all()
    
    if search:
        search_query = search.lower()
        filtered_products = []
        for p in products:
            tags_str = " ".join(p.tags) if p.tags else ""
            combined = f"{p.name} {p.category} {p.shortDescription} {tags_str}".lower()
            if search_query in combined:
                filtered_products.append(p)
        return {"products": [schemas.Product.from_orm(p) for p in filtered_products]}
        
    return {"products": [schemas.Product.from_orm(p) for p in products]}

@router.get("/{id}")
def get_product(id: str, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    return {"product": schemas.Product.from_orm(product)}

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_admin_user)):
    new_product = models.Product(
        id=f"prd_{int(datetime.datetime.utcnow().timestamp()*1000)}_{uuid.uuid4().hex[:6]}",
        **product.dict()
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return {"product": schemas.Product.from_orm(new_product)}

@router.put("/{id}")
def update_product(id: str, product_update: schemas.ProductUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_admin_user)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    
    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    return {"product": schemas.Product.from_orm(product)}

@router.delete("/{id}")
def delete_product(id: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_admin_user)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted."}
