# # from fastapi import APIRouter, UploadFile, File


# # router = APIRouter(prefix="/ai", tags=["AI"])




# # @router.post("/leak-detect")
# # async def leak_detect(file: UploadFile = File(...)):
# # # Simple demo logic (mock). A real model would analyze audio signal.
# # content = await file.read()
# # size = len(content)
# # # Heuristic: if audio length > threshold, pretend a leak is detected
# # leak_detected = size > 50_000 # ~50KB (tweak for demo)
# # confidence = 0.85 if leak_detected else 0.15
# # return {"leak_detected": leak_detected, "confidence": confidence, "bytes": size}

# from fastapi import APIRouter, UploadFile, File

# router = APIRouter(prefix="/ai", tags=["AI"])

# @router.post("/leak-detect")
# async def leak_detect(file: UploadFile = File(...)):
#     """
#     Mock leak detection endpoint.
#     """
#     content = await file.read()
#     size = len(content)

#     # Simple heuristic: if file > 50KB, treat it as a leak
#     leak_detected = size > 50_000
#     confidence = 0.85 if leak_detected else 0.15

#     return {
#         "filename": file.filename,
#         "bytes_received": size,
#         "leak_detected": leak_detected,
#         "confidence": confidence
#     }
# backend/app/routers/ai.py
from fastapi import APIRouter
from datetime import datetime
import random

router = APIRouter(prefix="/ai", tags=["AI"])

@router.get("/leak-status")
async def leak_status():
    """
    Mock real-time leakage status.
    Randomly returns leak/no leak for demonstration.
    """
    status_ok = random.random() > 0.2  # 80% chance no leak
    return {"ok": status_ok, "ts": datetime.utcnow().timestamp() * 1000}  # ms timestamp
