'use client'

import { Play, Heart, MessageCircle } from 'lucide-react'
import { Video } from '@/types'
import { formatViews, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface VideoCardProps {
  video: Video
  onClick?: () => void
}

export default function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div 
      className="card cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        
        {/* Play overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Play className="w-6 h-6 text-gray-900 ml-1" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {video.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">{video.author}</span>
          <span>{formatViews(video.views)}회 시청</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {formatDate(video.createdAt)}
          </span>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{video.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{video.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 