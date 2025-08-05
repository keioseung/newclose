'use client';

import { Heart, MessageCircle, Eye, MoreVertical, Play, Clock, User, Calendar } from 'lucide-react';
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
            <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-2xl group-hover:scale-110 transition-transform duration-500">
              <Play className="h-8 w-8 text-white ml-1" fill="white" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl font-semibold border border-white/20">
            {formatDuration(video.duration)}
          </div>

          {/* More options */}
          <button className="absolute top-3 right-3 p-2.5 bg-black/50 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70">
            <MoreVertical className="h-4 w-4" />
          </button>

          {/* Group badge */}
          {video.group && (
            <div className="absolute top-3 left-3">
              <span className="badge badge-primary">
                {video.group}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and author */}
          <div className="mb-4">
            <h3 className="font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors duration-300 text-lg leading-tight">
              {video.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-indigo-600" />
              </div>
              <span className="font-medium">{video.author}</span>
              <span className="text-slate-400">•</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(video.uploadDate)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {video.description && (
            <p className="text-sm text-slate-600 mb-4 line-clamp-2">
              {video.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1.5">
                <Eye className="h-4 w-4 text-indigo-500" />
                <span className="font-medium">{formatViews(video.views)}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="font-medium">{formatDate(video.uploadDate)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onLike?.(video.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 font-medium
                  ${video.isLiked 
                    ? 'text-red-500 bg-red-50 hover:bg-red-100 border border-red-200' 
                    : 'text-slate-500 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200'
                  }
                `}
              >
                <Heart className={`h-4 w-4 ${video.isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{video.likes}</span>
              </button>
              
              <button
                onClick={() => onComment?.(video.id)}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200 transition-all duration-300 font-medium"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{video.comments}</span>
              </button>
            </div>

            {/* Premium indicator */}
            <div className="flex items-center space-x-1.5 px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg border border-amber-200/50">
              <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"></div>
              <span className="text-xs font-semibold text-amber-700">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 