from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime, date

# --- Auth / Users ---
class UserCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(..., min_length=6)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: str
    name: str
    email: EmailStr
    badges: List[str] = []
    total_usage: int = 0
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


# --- Usage ---
class UsageCreate(BaseModel):
    liters_used: int = Field(..., ge=0, alias="liters_used")  # accept snake_case
    date: Optional[date] = None
    category: str

    class Config:
        populate_by_name = True


class UsagePublic(BaseModel):
    id: str
    user_id: str
    liters_used: int = Field(..., alias="liters_used")
    date: date
    category: str

    class Config:
        populate_by_name = True



class UsageSummary(BaseModel):
    user_id: str
    total_liters: int


# --- Challenges ---
class ChallengeCreate(BaseModel):
    title: str
    target_liters: int = Field(..., ge=1)
    days: int = Field(..., ge=1)


class ChallengePublic(BaseModel):
    id: str
    title: str
    target_liters: int
    days: int
    participants: List[str]
    status: str
