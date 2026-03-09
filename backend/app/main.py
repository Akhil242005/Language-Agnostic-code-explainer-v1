from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.explain import router as explain_router
from app.core.config import settings

app = FastAPI(
    title=settings.app_name,
    version=settings.version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(explain_router)

@app.get("/")
def health_check():
    return {"status": "running"}
