from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CommentCreate(BaseModel):
    content: str

class CommentResponse(BaseModel):
    id: str
    video_id: str
    author: str
    content: str
    created_at: datetime
    avatar: Optional[str] = None

class CommentUpdate(BaseModel):
    content: str 