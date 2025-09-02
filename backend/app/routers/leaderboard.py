from fastapi import APIRouter, Depends
from ..database import get_db

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])

@router.get("")
async def leaderboard(db=Depends(get_db)):
    DAILY_LIMIT = 100  # liters per user (adjust as you like)

    pipeline = [
        {
            "$project": {
                "name": 1,
                "total_usage": {"$ifNull": ["$total_usage", 0]},
            }
        },
        {
            "$addFields": {
                "saved_liters": {
                    "$cond": [
                        {"$gt": [DAILY_LIMIT, "$total_usage"]},
                        {"$subtract": [DAILY_LIMIT, "$total_usage"]},
                        0,
                    ]
                }
            }
        },
        {"$sort": {"saved_liters": -1}},  # highest savings first
        {"$limit": 50},
    ]

    cursor = db.users.aggregate(pipeline)

    results = []
    async for doc in cursor:
        results.append({
            "user_id": str(doc.get("_id")),
            "name": doc.get("name"),
            "total_usage": doc.get("total_usage", 0),
            "saved_liters": doc.get("saved_liters", 0),
        })

    return results
