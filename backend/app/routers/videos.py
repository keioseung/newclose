from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from ..models.video import VideoCreate, VideoResponse
from ..services.video_service import create_video, get_videos, get_video, like_video, increment_views

router = APIRouter(prefix="/videos", tags=["videos"])

@router.post("/", response_model=VideoResponse)
async def create_new_video(video: VideoCreate):
    """새 영상 업로드"""
    try:
        return create_video(video)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[VideoResponse])
async def get_video_list(group: Optional[str] = Query(None, description="그룹별 필터링")):
    """영상 목록 조회"""
    try:
        return get_videos(group)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{video_id}", response_model=VideoResponse)
async def get_video_by_id(video_id: str):
    """특정 영상 조회"""
    video = get_video(video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    # 조회수 증가
    increment_views(video_id)
    return video

@router.post("/{video_id}/like")
async def like_video_by_id(video_id: str):
    """영상 좋아요"""
    success = like_video(video_id)
    if not success:
        raise HTTPException(status_code=404, detail="Video not found")
    
    return {"message": "Liked successfully"}

@router.get("/{video_id}/stats")
async def get_video_stats(video_id: str):
    """영상 통계 조회"""
    video = get_video(video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    return {
        "views": video.views,
        "likes": video.likes,
        "comments": video.comments
    } 