# from fastapi import APIRouter, Depends
# from ..database import get_db


# router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])




# @router.get("")
# async def leaderboard(db=Depends(get_db)):

# # Aggregate total_usage from users collection
# pipeline = [
# {"$project": {"name": 1, "total_usage": 1}},
# {"$sort": {"total_usage": 1}}, # least usage first
# {"$limit": 50},
# ]
# cursor = db.users.aggregate(pipeline)
# results = []
# async for doc in cursor:
# results.append({
# "user_id": str(doc.get("_id")),
# "name": doc.get("name"),
# "total_usage": doc.get("total_usage", 0),
# })
# return results

from fastapi import APIRouter, Depends
from ..database import get_db

router = APIRouter(prefix="/leaderboard", tags=["Leaderboard"])


@router.get("")
async def leaderboard(db=Depends(get_db)):
    # Aggregate total_usage from users collection
    pipeline = [
        {"$project": {"name": 1, "total_usage": 1}},
        {"$sort": {"total_usage": 1}},  # least usage first
        {"$limit": 50},
    ]
    cursor = db.users.aggregate(pipeline)

    results = []
    async for doc in cursor:
        results.append({
            "user_id": str(doc.get("_id")),
            "name": doc.get("name"),
            "total_usage": doc.get("total_usage", 0),
        })
    return results
