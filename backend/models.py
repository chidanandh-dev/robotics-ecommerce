from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, DateTime
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="customer")
    created_at = Column(String, default=lambda: datetime.datetime.utcnow().isoformat())

class Product(Base):
    __tablename__ = "products"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, index=True)
    price = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
    emoji = Column(String, default="🤖")
    image = Column(String, nullable=True)
    featured = Column(Boolean, default=False)
    rating = Column(Float, default=4.8)
    shortDescription = Column(String, nullable=False)
    description = Column(String, nullable=False)
    tags = Column(JSON, default=list)

class Order(Base):
    __tablename__ = "orders"
    id = Column(String, primary_key=True, index=True)
    user_id = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    items = Column(JSON, nullable=False)
    total = Column(Float, nullable=False)
    status = Column(String, default="pending_payment")
    created_at = Column(String, default=lambda: datetime.datetime.utcnow().isoformat())

class Message(Base):
    __tablename__ = "messages"
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, default="")
    subject = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(String, default=lambda: datetime.datetime.utcnow().isoformat())
