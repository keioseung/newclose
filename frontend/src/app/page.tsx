'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import VideoCard from '@/components/VideoCard'
import UploadModal from '@/components/UploadModal'
import { Video, VideoUploadData } from '@/types'
import { getVideoThumbnail } from '@/lib/utils'
import { fetchVideos, createVideo } from '@/lib/api'

// 임시 데이터
const mockVideos: Video[] = [
  {
    id: '1',
    title: '가족 여행 하이라이트',
    description: '올해 여름 가족과 함께한 특별한 여행',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://via.placeholder.com/320x180/3b82f6/ffffff?text=가족+여행',
    duration: '3:24',
    author: '엄마',
    views: 12,
    likes: 8,
    comments: 3,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    group: '가족',
    privacy: 'private',
  },
  {
    id: '2',
    title: '파스타 만들기 클래스',
    description: '친구 민수가 알려주는 맛있는 파스타 레시피',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://via.placeholder.com/320x180/10b981/ffffff?text=요리+클래스',
    duration: '8:15',
    author: '친구 민수',
    views: 5,
    likes: 12,
    comments: 7,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    group: '친구들',
    privacy: 'group',
  },
  {
    id: '3',
    title: '팀 프로젝트 브레인스토밍',
    description: '새로운 아이디어를 위한 팀 회의',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://via.placeholder.com/320x180/f59e0b/ffffff?text=프로젝트+회의',
    duration: '15:32',
    author: '팀장 지영',
    views: 3,
    likes: 5,
    comments: 2,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    group: '팀 프로젝트',
    privacy: 'group',
  },
  {
    id: '4',
    title: '동생 생일 파티',
    description: '동생의 특별한 생일 축하',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://via.placeholder.com/320x180/8b5cf6/ffffff?text=생일+파티',
    duration: '5:48',
    author: '아빠',
    views: 18,
    likes: 15,
    comments: 8,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    group: '가족',
    privacy: 'private',
  },
  {
    id: '5',
    title: '홈 트레이닝 루틴',
    description: '집에서 할 수 있는 효과적인 운동',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://via.placeholder.com/320x180/ef4444/ffffff?text=운동+루틴',
    duration: '12:05',
    author: '친구 수진',
    views: 7,
    likes: 9,
    comments: 4,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    group: '친구들',
    privacy: 'group',
  },
  {
    id: '6',
    title: 'React 컴포넌트 만들기',
    description: '팀원 준호의 코딩 튜토리얼',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://via.placeholder.com/320x180/06b6d4/ffffff?text=코딩+튜토리얼',
    duration: '22:18',
    author: '팀원 준호',
    views: 4,
    likes: 6,
    comments: 3,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    group: '팀 프로젝트',
    privacy: 'group',
  },
]

const filters = ['전체', '최신순', '인기순', '가족', '친구들', '팀 프로젝트']

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('전체')
  const [videos, setVideos] = useState<Video[]>(mockVideos)

  const handleUpload = async (data: VideoUploadData) => {
    const newVideo = await createVideo(data)
    if (newVideo) {
      setVideos([newVideo, ...videos])
    }
  }

  const filteredVideos = videos.filter(video => {
    if (activeFilter === '전체') return true
    if (activeFilter === '가족') return video.group === '가족'
    if (activeFilter === '친구들') return video.group === '친구들'
    if (activeFilter === '팀 프로젝트') return video.group === '팀 프로젝트'
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="lg:ml-64">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onUploadClick={() => setUploadModalOpen(true)}
        />
        
        <main className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => {
                  // 비디오 플레이어 모달 열기
                  console.log('Play video:', video.title)
                }}
              />
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">영상이 없습니다</div>
              <div className="text-gray-500">새로운 영상을 업로드해보세요!</div>
            </div>
          )}
        </main>
      </div>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleUpload}
      />
    </div>
  )
} 