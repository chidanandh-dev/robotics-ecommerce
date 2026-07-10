from pydantic import BaseModel, EmailStr
from typing import List, Optional

# --- User ---
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: str
    role: str
    
    class Config:
        from_attributes = True

# --- Product ---
class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    stock: int
    emoji: Optional[str] = "🤖"
    image: Optional[str] = None
    featured: Optional[bool] = False
    rating: Optional[float] = 4.8
    shortDescription: str
    description: str
    tags: Optional[List[str]] = []

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    emoji: Optional[str] = None
    image: Optional[str] = None
    featured: Optional[bool] = None
    rating: Optional[float] = None
    shortDescription: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[List[str]] = None

class Product(ProductBase):
    id: str
    
    class Config:
        from_attributes = True

# --- Order ---
class CartItem(BaseModel):
    id: str
    quantity: int

class OrderItem(BaseModel):
    productId: str
    name: str
    quantity: int
    price: float

class OrderCreate(BaseModel):
    items: List[CartItem]

class Order(BaseModel):
    id: str
    userId: str
    customerEmail: str
    items: List[OrderItem]
    total: float
    status: str
    createdAt: str
    
    class Config:
        from_attributes = True

# --- Message ---
class MessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = ""
    subject: str
    message: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: str
    createdAt: str
    
    class Config:
        from_attributes = True
