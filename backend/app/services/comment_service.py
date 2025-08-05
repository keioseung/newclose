from datetime import datetime
from typing import List, Optional
from ..models.comment import CommentCreate, CommentResponse
from ..config.database import db

def create_comment(video_id: str, comment_data: CommentCreate, author: str = "마루니") -> Optional[CommentResponse]:
    """댓글 생성"""
    # 비디오 존재 확인
    video_exists = any(v.id == video_id for v in db.videos)
    if not video_exists:
        return None
    
    new_comment = CommentResponse(
        id=str(len(db.comments) + 1),
        video_id=video_id,
        author=author,
        content=comment_data.content,
        created_at=datetime.now(),
        avatar=None
    )
    
    db.comments.append(new_comment)
    
    # 비디오의 댓글 수 증가
    for video in db.videos:
        if video.id == video_id:
            video.comments += 1
            break
    
    return new_comment

def get_comments(video_id: str) -> List[CommentResponse]:
    """영상 댓글 조회"""
    return [c for c in db.comments if c.video_id == video_id]

def delete_comment(comment_id: str, author: str) -> bool:
    """댓글 삭제 (작성자만 가능)"""
    for i, comment in enumerate(db.comments):
        if comment.id == comment_id and comment.author == author:
            # 비디오의 댓글 수 감소
            for video in db.videos:
                if video.id == comment.video_id:
                    video.comments -= 1
                    break
            
            db.comments.pop(i)
            return True
    return False 