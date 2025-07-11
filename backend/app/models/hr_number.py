from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HRNumber(BaseModel):
    id: Optional[int] = None
    phone_number: str
    company_name: str
    department: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class HRNumberCreate(BaseModel):
    phone_number: str
    company_name: str
    department: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None

class HRNumberUpdate(BaseModel):
    company_name: Optional[str] = None
    department: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    notes: Optional[str] = None 