from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InsightRequest(BaseModel):
    user_id: str
    goals: list

@app.post("/insight")
async def get_insight(data: InsightRequest):
    # Placeholder for AI/ML logic
    return {
        "suggestion": "Based on your goals, try focusing on one key habit this week!",
        "goals": data.goals
    }

@app.get("/")
async def root():
    return {"message": "LifeScape AI Service is running."} 