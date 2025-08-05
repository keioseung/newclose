import { Video, VideoUploadData, Comment } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function fetchVideos(group?: string): Promise<Video[]> {
  try {
    const url = group && group !== '전체' 
      ? `${API_BASE_URL}/videos?group=${encodeURIComponent(group)}`
      : `${API_BASE_URL}/videos`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch videos')
    }
    
    const data = await response.json()
    return data.map((video: any) => ({
      ...video,
      createdAt: new Date(video.created_at),
    }))
  } catch (error) {
    console.error('Error fetching videos:', error)
    return []
  }
}

export async function createVideo(videoData: VideoUploadData): Promise<Video | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: videoData.title,
        description: videoData.description,
        url: videoData.url,
        group: videoData.group,
        privacy: videoData.privacy,
        download_disabled: videoData.downloadDisabled,
        external_share_disabled: videoData.externalShareDisabled,
      }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create video')
    }
    
    const data = await response.json()
    return {
      ...data,
      createdAt: new Date(data.created_at),
    }
  } catch (error) {
    console.error('Error creating video:', error)
    return null
  }
}

export async function likeVideo(videoId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/like`, {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error('Failed to like video')
    }
    
    return true
  } catch (error) {
    console.error('Error liking video:', error)
    return false
  }
}

export async function fetchComments(videoId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments`)
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    
    const data = await response.json()
    return data.map((comment: any) => ({
      ...comment,
      createdAt: new Date(comment.created_at),
    }))
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

export async function createComment(videoId: string, content: string): Promise<Comment | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    
    const data = await response.json()
    return {
      ...data,
      createdAt: new Date(data.created_at),
    }
  } catch (error) {
    console.error('Error creating comment:', error)
    return null
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