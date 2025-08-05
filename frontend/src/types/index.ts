export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail: string;
  duration: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  createdAt: Date;
  group: string;
  privacy: 'private' | 'group' | 'public';
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  description?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  groups: string[];
}

export interface Comment {
  id: string;
  videoId: string;
  author: string;
  content: string;
  createdAt: Date;
  avatar?: string;
}

export interface VideoUploadData {
  title: string;
  description?: string;
  url: string;
  group: string;
  privacy: 'private' | 'group' | 'public';
  downloadDisabled: boolean;
  externalShareDisabled: boolean;
} 