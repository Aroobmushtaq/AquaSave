
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import CORS_ORIGINS_LIST
from backend.app.routers import users, usage, leaderboard, challenges, ai
from backend.app.database import check_connection   # 👈 import the ping function

app = FastAPI(title="AquaSave API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS_LIST or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(usage.router)
app.include_router(leaderboard.router)
app.include_router(challenges.router)
app.include_router(ai.router)


@app.on_event("startup")
async def startup_db_client():
    # 👇 check MongoDB connection on app startup
    await check_connection()


@app.get("/")
async def root():
    return {"status": "ok", "service": "AquaSave API"}
