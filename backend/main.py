from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import os

from routers import auth, products, payments, admin, contact

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Robotics E-commerce API")

allowed_origins = [
    os.getenv("CLIENT_URL", "http://localhost:5173"),
    "http://localhost:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Netcom Robotics API is running (FastAPI)"}

app.include_router(auth.router)
app.include_router(products.router)
app.include_router(payments.router)
app.include_router(admin.router)
app.include_router(contact.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
