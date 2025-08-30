# from fastapi import APIRouter, Depends, HTTPException
# from bson import ObjectId
# from ..database import get_db
# from ..schemas import ChallengeCreate, ChallengePublic
# from ..auth import get_current_user


# router = APIRouter(prefix="/challenges", tags=["Challenges"])




# @router.post("/create", response_model=ChallengePublic)
# async def create_challenge(payload: ChallengeCreate, current=Depends(get_current_user), db=Depends(get_db)):
# doc = {
# "title": payload.title,
# "target_liters": payload.target_liters,
# "days": payload.days,
# "participants": [current["_id"]],
# "status": "ongoing",
# }
# res = await db.challenges.insert_one(doc)
# doc["_id"] = res.inserted_id
# return ChallengePublic(
# id=str(doc["_id"]),
# title=doc["title"],
# target_liters=doc["target_liters"],
# days=doc["days"],
# participants=[str(p) for p in doc["participants"]],
# status=doc["status"],
# )




# @router.get("", response_model=list[ChallengePublic])
# async def list_challenges(db=Depends(get_db)):
# items = []
# async for c in db.challenges.find().sort("_id", -1):
# items.append(ChallengePublic(
# id=str(c["_id"]),
# title=c["title"],
# target_liters=c["target_liters"],
# days=c["days"],
# participants=[str(p) for p in c.get("participants", [])],
# status=c.get("status", "ongoing"),
# ))
# return items




# @router.post("/join/{challenge_id}")
# async def join_challenge(challenge_id: str, current=Depends(get_current_user), db=Depends(get_db)):
# try:
# oid = ObjectId(challenge_id)
# except Exception:
# raise HTTPException(status_code=400, detail="Invalid id")


# await db.challenges.update_one({"_id": oid}, {"$addToSet": {"participants": current["_id"]}})
# return {"message": "Joined challenge"}

from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from ..database import get_db
from ..schemas import ChallengeCreate, ChallengePublic
from ..auth import get_current_user

router = APIRouter(prefix="/challenges", tags=["Challenges"])


@router.post("/create", response_model=ChallengePublic)
async def create_challenge(payload: ChallengeCreate, current=Depends(get_current_user), db=Depends(get_db)):
    doc = {
        "title": payload.title,
        "target_liters": payload.target_liters,
        "days": payload.days,
        "participants": [current["_id"]],
        "status": "ongoing",
    }
    res = await db.challenges.insert_one(doc)
    doc["_id"] = res.inserted_id

    return ChallengePublic(
        id=str(doc["_id"]),
        title=doc["title"],
        target_liters=doc["target_liters"],
        days=doc["days"],
        participants=[str(p) for p in doc["participants"]],
        status=doc["status"],
    )


@router.get("", response_model=list[ChallengePublic])
async def list_challenges(db=Depends(get_db)):
    items = []
    async for c in db.challenges.find().sort("_id", -1):
        items.append(ChallengePublic(
            id=str(c["_id"]),
            title=c["title"],
            target_liters=c["target_liters"],
            days=c["days"],
            participants=[str(p) for p in c.get("participants", [])],
            status=c.get("status", "ongoing"),
        ))
    return items


@router.post("/join/{challenge_id}")
async def join_challenge(challenge_id: str, current=Depends(get_current_user), db=Depends(get_db)):
    try:
        oid = ObjectId(challenge_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid challenge ID")

    result = await db.challenges.update_one(
        {"_id": oid},
        {"$addToSet": {"participants": current["_id"]}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Challenge not found")

    return {"message": "Joined challenge"}
