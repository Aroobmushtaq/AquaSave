from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime
from ..schemas import UserCreate, UserLogin, UserPublic, Token
from ..auth import hash_password, verify_password, create_access_token, get_current_user
from ..database import get_db


router = APIRouter(prefix="/users", tags=["Users"])


from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from ..schemas import UserCreate, UserPublic
from ..auth import hash_password
from ..database import get_db

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register")
async def register(payload: UserCreate, db=Depends(get_db)):
    existing = await db.users.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    doc = {
        "name": payload.name,
        "email": payload.email.lower(),
        "password": hash_password(payload.password),
        "badges": [],
        "total_usage": 0,
        "created_at": datetime.utcnow(),
    }
    res = await db.users.insert_one(doc)
    doc["_id"] = res.inserted_id

    return {
        "message": "User registered successfully",
        "user": {
            "id": str(doc["_id"]),
            "name": doc["name"],
            "email": doc["email"],
            "badges": doc["badges"],
            "total_usage": doc["total_usage"],
            "created_at": doc["created_at"],
        }
    }



@router.post("/login", response_model=Token)
async def login(payload: UserLogin, db=Depends(get_db)):
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_access_token({"sub": str(user["_id"])})
    return Token(access_token=token)


@router.get("/me", response_model=UserPublic)
async def me(current=Depends(get_current_user)):
    return UserPublic(
        id=str(current["_id"]),
        name=current["name"],
        email=current["email"],
        badges=current.get("badges", []),
        total_usage=current.get("total_usage", 0),
        created_at=current["created_at"],
    )
