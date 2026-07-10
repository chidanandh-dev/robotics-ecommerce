from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import os
import datetime
import uuid
from passlib.context import CryptContext
import jwt

import models
import schemas
from dependencies import get_db, get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET", "supersecret")
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")
    
    normalized_email = user.email.lower().strip()
    db_user = db.query(models.User).filter(models.User.email == normalized_email).first()
    if db_user:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")
    
    hashed_password = pwd_context.hash(user.password)
    new_user = models.User(
        id=f"usr_{int(datetime.datetime.utcnow().timestamp()*1000)}_{uuid.uuid4().hex[:6]}",
        name=user.name.strip(),
        email=normalized_email,
        password_hash=hashed_password,
        role="customer"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    token = create_access_token(data={"id": new_user.id, "email": new_user.email})
    return {"user": schemas.User.from_orm(new_user), "token": token}

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    normalized_email = user.email.lower().strip()
    db_user = db.query(models.User).filter(models.User.email == normalized_email).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    if not pwd_context.verify(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    
    token = create_access_token(data={"id": db_user.id, "email": db_user.email})
    return {"user": schemas.User.from_orm(db_user), "token": token}

@router.get("/profile")
def get_profile(current_user: models.User = Depends(get_current_user)):
    return {"user": schemas.User.from_orm(current_user)}
