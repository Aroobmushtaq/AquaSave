
# from motor.motor_asyncio import AsyncIOMotorClient
# from .config import settings

# client: AsyncIOMotorClient | None = None


# def get_client() -> AsyncIOMotorClient:
#     global client
#     if client is None:
#         client = AsyncIOMotorClient(settings.MONGO_URL)
#     return client


# async def get_db():
#     db = get_client()[settings.DB_NAME]
#     return db
from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings

client: AsyncIOMotorClient | None = None

def get_client() -> AsyncIOMotorClient:
    global client
    if client is None:
        client = AsyncIOMotorClient(settings.MONGO_URL)
    return client

async def get_db():
    db = get_client()[settings.DB_NAME]
    return db

# 🔹 Function to test DB connection
async def check_connection():
    try:
        client = get_client()
        await client.admin.command("ping")  # sends a ping to MongoDB
        print("✅ MongoDB connected successfully!")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)
