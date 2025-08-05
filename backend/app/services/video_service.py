import re
from datetime import datetime
from typing import List, Optional
from ..models.video import VideoCreate, VideoResponse
from ..config.database import db

def extract_video_info(url: str) -> dict:
    """URL에서 비디오 정보 추출"""
    patterns = {
        'youtube': r'(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)',
        'instagram': r'(?:instagram\.com\/p\/|instagram\.com\/reel\/)([^\/\n?#]+)',
        'tiktok': r'(?:tiktok\.com\/@[^\/]+\/video\/)([^\/\n?#]+)'
    }
    
    for platform, pattern in patterns.items():
        match = re.match(pattern, url)
        if match:
            video_id = match.group(1)
            if platform == 'youtube':
                return {
                    'platform': 'youtube',
                    'video_id': video_id,
                    'thumbnail': f'https://img.youtube.com/vi/{video_id}/maxresdefault.jpg'
                }
            elif platform == 'instagram':
                return {
                    'platform': 'instagram',
                    'video_id': video_id,
                    'thumbnail': f'https://www.instagram.com/p/{video_id}/media/?size=l'
                }
            elif platform == 'tiktok':
                return {
                    'platform': 'tiktok',
                    'video_id': video_id,
                    'thumbnail': f'https://via.placeholder.com/320x180/3b82f6/ffffff?text=TikTok'
                }
    
    return {
        'platform': 'unknown',
        'video_id': None,
        'thumbnail': 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=Video'
    }

def create_video(video_data: VideoCreate, author: str = "마루니") -> VideoResponse:
    """새 영상 생성"""
    video_info = extract_video_info(video_data.url)
    
    new_video = VideoResponse(
        id=str(len(db.videos) + 1),
        title=video_data.title,
        description=video_data.description,
        url=video_data.url,
        thumbnail=video_info['thumbnail'],
        duration="0:00",  # 실제로는 API에서 가져와야 함
        author=author,
        views=0,
        likes=0,
        comments=0,
        created_at=datetime.now(),
        group=video_data.group,
        privacy=video_data.privacy
    )
    
    db.videos.append(new_video)
    return new_video

def get_videos(group: Optional[str] = None) -> List[VideoResponse]:
    """영상 목록 조회"""
    if group and group != "전체":
        return [v for v in db.videos if v.group == group]
    return db.videos

def get_video(video_id: str) -> Optional[VideoResponse]:
    """특정 영상 조회"""
    for video in db.videos:
        if video.id == video_id:
            return video
    return None

def like_video(video_id: str) -> bool:
    """영상 좋아요"""
    for video in db.videos:
        if video.id == video_id:
            video.likes += 1
            return True
    return False

def increment_views(video_id: str) -> bool:
    """영상 조회수 증가"""
    for video in db.videos:
        if video.id == video_id:
            video.views += 1
            return True
    return False 