from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import call_routes

app = FastAPI(title="HR Caller API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(call_routes.router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "HR Caller API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 