from fastapi import APIRouter, Depends, HTTPException, Request
from bson import ObjectId
from datetime import date
from ..schemas import UsageCreate, UsagePublic, UsageSummary
from ..database import get_db
from ..auth import get_current_user
from ..utils import today, calculate_badges
from fastapi import Request

router = APIRouter(prefix="/usage", tags=["Usage"])
@router.post("/add", response_model=UsagePublic)
async def add_usage(
    payload: UsageCreate,
    request: Request,   # fine to keep if used correctly
    current=Depends(get_current_user),
    db=Depends(get_db),
):
    raw = await request.json()
    print("📩 Raw Body:", raw)
    print("✅ Parsed Payload:", payload.dict())
    try:
        body = await request.json()
        print("RAW JSON BODY:", body)
    except Exception as e:
        print("⚠️ Could not parse JSON:", e)

    try:
        d = payload.date or today()
        doc = {
            "user_id": current["_id"],
            "liters_used": int(payload.liters_used),
            "category": payload.category,
            "date": d.isoformat(),
        }
        result = await db.usage.insert_one(doc)

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

        # Return response
        return UsagePublic(
            id=str(result.inserted_id),
            user_id=str(current["_id"]),
            liters_used=doc["liters_used"],
            date=date.fromisoformat(doc["date"]),
            category=doc["category"],
        )
    except Exception as e:
        print("❌ Error in /usage/add:", e)
        raise HTTPException(status_code=400, detail=f"Invalid usage data: {e}")


@router.get("/mine", response_model=list[UsagePublic])
async def my_usage(current=Depends(get_current_user), db=Depends(get_db)):
    cursor = db.usage.find({"user_id": current["_id"]}).sort("date", -1)
    items = []
    async for u in cursor:
        try:
            items.append(
                UsagePublic(
                    id=str(u.get("_id")),
                    user_id=str(u.get("user_id")),
                    liters_used=u.get("liters_used", 0),
                    date=date.fromisoformat(u.get("date")),
                    category=u.get("category", "other"),
                )
            )
        except Exception as e:
            print("⚠️ Skipped bad usage record:", u, "Error:", e)
    return items


@router.get("/total", response_model=UsageSummary)
async def my_total(current=Depends(get_current_user), db=Depends(get_db)):
    total = current.get("total_usage", 0)
    return UsageSummary(user_id=str(current["_id"]), total_liters=total)
