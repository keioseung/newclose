import { Video, VideoUploadData, Comment, Group } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API 응답 타입
interface ApiResponse<T> {
  data: T;
  message?: string;
}

// 에러 처리 함수
const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw new Error(error.message || 'API 요청 중 오류가 발생했습니다.');
};

// 기본 fetch 함수
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// 비디오 관련 API
export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await apiRequest<ApiResponse<Video[]>>('/videos/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    // Fallback to mock data
    return [];
  }
};

export const createVideo = async (videoData: VideoUploadData): Promise<Video> => {
  try {
    const response = await apiRequest<ApiResponse<Video>>('/videos/', {
      method: 'POST',
      body: JSON.stringify(videoData),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create video:', error);
    // Fallback: return mock video
    const mockVideo: Video = {
      id: Date.now().toString(),
      title: videoData.title,
      description: videoData.description,
      url: videoData.url,
      thumbnail: `https://picsum.photos/400/225?random=${Date.now()}`,
      author: '나',
      views: 0,
      likes: 0,
      comments: 0,
      duration: '0:00',
      uploadDate: new Date(),
      createdAt: new Date(),
      isLiked: false,
      group: videoData.group,
    };
    return mockVideo;
  }
};

export const likeVideo = async (videoId: string): Promise<void> => {
  try {
    await apiRequest(`/videos/${videoId}/like`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Failed to like video:', error);
  }
};

export const getVideoStats = async (videoId: string): Promise<any> => {
  try {
    const response = await apiRequest<ApiResponse<any>>(`/videos/${videoId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Failed to get video stats:', error);
    return null;
  }
};

// 댓글 관련 API
export const fetchComments = async (videoId: string): Promise<Comment[]> => {
  try {
    const response = await apiRequest<ApiResponse<Comment[]>>(`/videos/${videoId}/comments`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return [];
  }
};

export const createComment = async (
  videoId: string,
  content: string
): Promise<Comment> => {
  try {
    const response = await apiRequest<ApiResponse<Comment>>(`/videos/${videoId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create comment:', error);
    // Fallback: return mock comment
    const mockComment: Comment = {
      id: Date.now().toString(),
      videoId,
      author: '나',
      content,
      createdAt: new Date(),
    };
    return mockComment;
  }
};

export const deleteComment = async (commentId: string): Promise<void> => {
  try {
    await apiRequest(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Failed to delete comment:', error);
  }
};

// 그룹 관련 API
export const fetchGroups = async (): Promise<Group[]> => {
  try {
    const response = await apiRequest<ApiResponse<Group[]>>('/groups/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    // Fallback to mock data
    return [
      {
        id: 'family',
        name: '가족',
        memberCount: 5,
        description: '가족과 함께하는 특별한 순간들',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'friends',
        name: '친구들',
        memberCount: 8,
        description: '친구들과 공유하는 재미있는 영상들',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'work',
        name: '팀 프로젝트',
        memberCount: 12,
        description: '팀 프로젝트 관련 영상들',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 'hobby',
        name: '동호회',
        memberCount: 15,
        description: '동호회 활동 영상들',
        createdAt: new Date('2024-01-01'),
      },
    ];
  }
};

// 헬스체크
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    await apiRequest('/');
    return true;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
}; 