

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from datetime import date
from ..schemas import UsageCreate, UsagePublic, UsageSummary
from ..database import get_db
from ..auth import get_current_user
from ..utils import today, calculate_badges

router = APIRouter(prefix="/usage", tags=["Usage"])


@router.post("/add")
async def add_usage(payload: UsageCreate, current=Depends(get_current_user), db=Depends(get_db)):
    d = payload.date or today()
    doc = {
        "user_id": current["_id"],
        "liters_used": int(payload.liters_used),
        "date": d.isoformat(),
    }
    await db.usage.insert_one(doc)

    # Update user's total_usage
    await db.users.update_one(
        {"_id": current["_id"]},
        {"$inc": {"total_usage": int(payload.liters_used)}}
    )

    # Recalculate badges
    user = await db.users.find_one({"_id": current["_id"]})
    new_badges = calculate_badges(user.get("total_usage", 0))
    await db.users.update_one(
        {"_id": current["_id"]},
        {"$set": {"badges": new_badges}}
    )

    return {"message": "Usage added"}


@router.get("/mine", response_model=list[UsagePublic])
async def my_usage(current=Depends(get_current_user), db=Depends(get_db)):
    cursor = db.usage.find({"user_id": current["_id"]}).sort("date", -1)
    items = []
    async for u in cursor:
        items.append(
            UsagePublic(
                id=str(u.get("_id")),
                user_id=str(u.get("user_id")),
                liters_used=u.get("liters_used", 0),
                date=date.fromisoformat(u.get("date")),
            )
        )
    return items


@router.get("/total", response_model=UsageSummary)
async def my_total(current=Depends(get_current_user), db=Depends(get_db)):
    total = current.get("total_usage", 0)
    return UsageSummary(user_id=str(current["_id"]), total_liters=total)
