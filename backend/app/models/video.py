from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class VideoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    url: str
    group: str = "전체"
    privacy: str = "private"
    download_disabled: bool = True
    external_share_disabled: bool = True

class VideoResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    url: str
    thumbnail: str
    duration: str
    author: str
    views: int
    likes: int
    comments: int
    created_at: datetime
    group: str
    privacy: str

class VideoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    group: Optional[str] = None
    privacy: Optional[str] = None 