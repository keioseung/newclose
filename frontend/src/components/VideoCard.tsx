'use client';

import { Heart, MessageCircle, Eye, MoreVertical, Play, Clock } from 'lucide-react';
import { formatDuration, formatViews, formatDate } from '@/lib/utils';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

export default function VideoCard({ video, onLike, onComment }: VideoCardProps) {
  return (
    <div className="video-card group">
      <div className="card card-hover overflow-hidden">
        {/* Thumbnail */}
        <div className="video-thumbnail relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          
          {/* Play overlay */}
          <div className="video-overlay flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <Play className="h-6 w-6 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
            {formatDuration(video.duration)}
          </div>

          {/* More options */}
          <button className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title and author */}
          <div className="mb-3">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors duration-200">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 flex items-center space-x-2">
              <span>{video.author}</span>
              <span className="text-gray-400">•</span>
              <span>{formatDate(video.uploadDate)}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(video.views)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(video.uploadDate)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onLike?.(video.id)}
                className={`
                  flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200
                  ${video.isLiked 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                    : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                  }
                `}
              >
                <Heart className={`h-4 w-4 ${video.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{video.likes}</span>
              </button>
              
              <button
                onClick={() => onComment?.(video.id)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{video.comments}</span>
              </button>
            </div>

            {/* Group badge */}
            {video.group && (
              <span className="badge badge-primary">
                {video.group}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 