from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# 라우터들 import
from app.routers import videos, comments, groups

load_dotenv()

app = FastAPI(
    title="CloseTube API",
    description="프라이빗 영상 공유 플랫폼 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://closetube.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(videos.router)
app.include_router(comments.router)
app.include_router(groups.router)

@app.get("/")
async def root():
    return {"message": "CloseTube API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 