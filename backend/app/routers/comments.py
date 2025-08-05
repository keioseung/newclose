from fastapi import APIRouter, HTTPException
from typing import List
from ..models.comment import CommentCreate, CommentResponse
from ..services.comment_service import create_comment, get_comments, delete_comment

router = APIRouter(prefix="/videos", tags=["comments"])

@router.post("/{video_id}/comments", response_model=CommentResponse)
async def create_new_comment(video_id: str, comment: CommentCreate):
    """댓글 작성"""
    try:
        new_comment = create_comment(video_id, comment)
        if not new_comment:
            raise HTTPException(status_code=404, detail="Video not found")
        return new_comment
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{video_id}/comments", response_model=List[CommentResponse])
async def get_video_comments(video_id: str):
    """영상 댓글 조회"""
    try:
        return get_comments(video_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/comments/{comment_id}")
async def delete_comment_by_id(comment_id: str, author: str):
    """댓글 삭제"""
    success = delete_comment(comment_id, author)
    if not success:
        raise HTTPException(status_code=404, detail="Comment not found or unauthorized")
    
    return {"message": "Comment deleted successfully"} 