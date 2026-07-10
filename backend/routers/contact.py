from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid
import datetime
import os
import smtplib
from email.message import EmailMessage

import models
import schemas
from dependencies import get_db

router = APIRouter(prefix="/api/contact", tags=["contact"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def send_contact_message(msg_req: schemas.MessageCreate, db: Session = Depends(get_db)):
    new_message = models.Message(
        id=f"msg_{int(datetime.datetime.utcnow().timestamp()*1000)}_{uuid.uuid4().hex[:6]}",
        **msg_req.dict()
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    
    email_user = os.getenv("EMAIL_USER")
    email_pass = os.getenv("EMAIL_PASS")
    contact_receiver = os.getenv("CONTACT_RECEIVER", email_user)
    
    if email_user and email_pass:
        try:
            msg = EmailMessage()
            msg.set_content(f"Name: {msg_req.name}\nEmail: {msg_req.email}\nPhone: {msg_req.phone or '-'}\n\n{msg_req.message}")
            msg["Subject"] = f"Robotics enquiry: {msg_req.subject}"
            msg["From"] = email_user
            msg["To"] = contact_receiver
            msg["Reply-To"] = msg_req.email
            
            # Using gmail smtp as default like the original
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(email_user, email_pass)
                smtp.send_message(msg)
        except Exception as e:
            print(f"Failed to send email: {e}")
            
    return {"message": "Message received.", "contact": schemas.Message.from_orm(new_message)}
