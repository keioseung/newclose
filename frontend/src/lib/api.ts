import { Video, VideoUploadData } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchVideos(): Promise<Video[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`);
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
}

export async function createVideo(data: VideoUploadData): Promise<Video> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create video');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
}

export async function likeVideo(videoId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/like`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to like video');
    }
  } catch (error) {
    console.error('Error liking video:', error);
    throw error;
  }
}

export async function fetchComments(videoId: string): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
}

export async function createComment(videoId: string, content: string): Promise<any> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create comment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

export async function fetchGroups(): Promise<{ name: string; member_count: number }[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/groups`)
    if (!response.ok) {
      throw new Error('Failed to fetch groups')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching groups:', error)
    return []
  }
} 