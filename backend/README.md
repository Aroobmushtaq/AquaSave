# AquaSave – FastAPI Backend (Hackathon Ready)

## Quick Start
1. **Create virtual env & install**
```bash
python -m venv .venv
source .venv/bin/activate # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
```


2. **Set environment**
Create `.env` in the project root (copy from the example at top of this file section) and set:
```
MONGO_URL=your_mongodb_uri
DB_NAME=aquasave
JWT_SECRET=change_me
JWT_ALGORITHM=HS256
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```


3. **Run server**
```bash
uvicorn app.main:app --reload --port 8000
```


4. **Open API docs**
- Swagger: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc


## Auth Flow
- `POST /users/register` → create user
- `POST /users/login` → returns `{ access_token }`
- Use token as `Authorization: Bearer <token>` for protected routes


## Core Routes
- `POST /usage/add` → add daily liters
- `GET /usage/mine` → list my entries
- `GET /usage/total` → my total liters
- `GET /leaderboard` → top 50 (least usage first)
- `POST /challenges/create` → create
- `GET /challenges` → list
- `POST /challenges/join/{id}` → join
- `POST /ai/leak-detect` → upload audio (mock detection)


## Notes
- **Mongo ObjectIds** are stored internally. API returns strings where needed.
- **Badges** auto-update when you add usage (see `utils.calculate_badges`).
- **AI endpoint is mocked** for demo. You can plug a real model later.


## Deploy (Railway/Render/Heroku)
- Set the same environment variables on the platform.
- Run command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`