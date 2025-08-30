
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    MONGO_URL: str = "mongodb://localhost:27017"
    DB_NAME: str = "aquasave"
    JWT_SECRET: str = "change_me"
    JWT_ALGORITHM: str = "HS256"
    CORS_ORIGINS: str = "*"  # comma separated

    class Config:
        env_file = ".env"


# Create settings instance
settings = Settings()

# Parse CORS origins into a list
CORS_ORIGINS_LIST: List[str] = [
    o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()
]
