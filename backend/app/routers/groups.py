from fastapi import APIRouter
from typing import List, Dict

router = APIRouter(prefix="/groups", tags=["groups"])

@router.get("/", response_model=List[Dict[str, any]])
async def get_groups():
    """그룹 목록 조회"""
    groups = [
        {"name": "가족", "member_count": 4, "description": "가족과 함께하는 특별한 순간들"},
        {"name": "친구들", "member_count": 6, "description": "친구들과 공유하는 재미있는 영상들"},
        {"name": "팀 프로젝트", "member_count": 3, "description": "팀 프로젝트 관련 영상들"},
    ]
    return groups

@router.get("/{group_name}/members")
async def get_group_members(group_name: str):
    """그룹 멤버 조회"""
    # 실제로는 데이터베이스에서 조회
    members = {
        "가족": ["엄마", "아빠", "동생", "마루니"],
        "친구들": ["민수", "수진", "지영", "준호", "영희", "철수"],
        "팀 프로젝트": ["팀장 지영", "개발자 준호", "디자이너 마루니"]
    }
    
    if group_name not in members:
        return {"members": []}
    
    return {"members": members[group_name]} 