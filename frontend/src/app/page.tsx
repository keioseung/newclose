'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import UploadModal from '@/components/UploadModal';
import { Video } from '@/types';
import { fetchVideos, createVideo } from '@/lib/api';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Failed to load videos:', error);
      // Fallback to mock data
      setVideos([
        {
          id: '1',
          title: '아름다운 자연 풍경',
          description: '자연의 아름다움을 담은 영상입니다.',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://picsum.photos/400/225?random=1',
          author: '자연사랑',
          views: 1234,
          likes: 89,
          comments: 12,
          duration: '3:45',
          uploadDate: new Date('2024-01-15'),
          createdAt: new Date('2024-01-15'),
          isLiked: false,
          group: '가족'
        },
        {
          id: '2',
          title: '요리 레시피: 파스타 만들기',
          description: '집에서 쉽게 만들 수 있는 파스타 레시피입니다.',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://picsum.photos/400/225?random=2',
          author: '쿡마스터',
          views: 5678,
          likes: 234,
          comments: 45,
          duration: '8:20',
          uploadDate: new Date('2024-01-14'),
          createdAt: new Date('2024-01-14'),
          isLiked: true,
          group: '친구들'
        },
        {
          id: '3',
          title: '여행 브이로그: 제주도',
          description: '제주도의 아름다운 풍경을 담은 여행 영상입니다.',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://picsum.photos/400/225?random=3',
          author: '트래블러',
          views: 3456,
          likes: 156,
          comments: 23,
          duration: '12:30',
          uploadDate: new Date('2024-01-13'),
          createdAt: new Date('2024-01-13'),
          isLiked: false,
          group: '동호회'
        },
        {
          id: '4',
          title: '운동 루틴: 홈 트레이닝',
          description: '집에서 할 수 있는 효과적인 운동 루틴입니다.',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://picsum.photos/400/225?random=4',
          author: '피트니스코치',
          views: 7890,
          likes: 445,
          comments: 67,
          duration: '15:45',
          uploadDate: new Date('2024-01-12'),
          createdAt: new Date('2024-01-12'),
          isLiked: true,
          group: '팀 프로젝트'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (data: any) => {
    try {
      const newVideo = await createVideo(data);
      setVideos(prev => [newVideo, ...prev]);
      setUploadModalOpen(false);
    } catch (error) {
      console.error('Upload failed:', error);
      // Fallback: add to local state
      const mockVideo: Video = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        url: data.url,
        thumbnail: 'https://picsum.photos/400/225?random=' + Date.now(),
        author: '나',
        views: 0,
        likes: 0,
        comments: 0,
        duration: '0:00',
        uploadDate: new Date(),
        createdAt: new Date(),
        isLiked: false,
        group: data.group
      };
      setVideos(prev => [mockVideo, ...prev]);
      setUploadModalOpen(false);
    }
  };

  const handleLike = (videoId: string) => {
    setVideos(prev => prev.map(video => 
      video.id === videoId 
        ? { ...video, isLiked: !video.isLiked, likes: video.isLiked ? video.likes - 1 : video.likes + 1 }
        : video
    ));
  };

  const handleComment = (videoId: string) => {
    // TODO: Implement comment functionality
    console.log('Comment on video:', videoId);
  };

  const filteredVideos = activeFilter === 'all' 
    ? videos 
    : videos.filter(video => video.group === activeFilter);

  const filters = [
    { id: 'all', name: '전체', count: videos.length },
    { id: 'family', name: '가족', count: videos.filter(v => v.group === '가족').length },
    { id: 'friends', name: '친구들', count: videos.filter(v => v.group === '친구들').length },
    { id: 'work', name: '팀 프로젝트', count: videos.filter(v => v.group === '팀 프로젝트').length },
    { id: 'hobby', name: '동호회', count: videos.filter(v => v.group === '동호회').length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <Header 
        onMenuToggle={() => setSidebarOpen(true)}
        onUploadClick={() => setUploadModalOpen(true)}
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 flex-shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Desktop sidebar content would go here */}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8 fade-in">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                안녕하세요! 👋
              </h1>
              <p className="text-lg text-gray-600">
                오늘은 어떤 영상을 공유하고 싶으신가요?
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 slide-up">
              <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200
                      ${activeFilter === filter.id
                        ? 'bg-primary-100 text-primary-700 border border-primary-200'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }
                    `}
                  >
                    <span className="font-medium">{filter.name}</span>
                    <span className={`
                      text-xs px-2 py-1 rounded-full
                      ${activeFilter === filter.id
                        ? 'bg-primary-200 text-primary-800'
                        : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {filter.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Videos Grid */}
            {loading ? (
              <div className="video-grid">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="card overflow-hidden">
                    <div className="skeleton aspect-video"></div>
                    <div className="p-4 space-y-3">
                      <div className="skeleton h-4 w-3/4"></div>
                      <div className="skeleton h-3 w-1/2"></div>
                      <div className="skeleton h-3 w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredVideos.length > 0 ? (
              <div className="video-grid">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onLike={handleLike}
                    onComment={handleComment}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  영상이 없습니다
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeFilter === 'all' 
                    ? '첫 번째 영상을 업로드해보세요!'
                    : '이 그룹에는 아직 영상이 없습니다.'
                  }
                </p>
                {activeFilter === 'all' && (
                  <button
                    onClick={() => setUploadModalOpen(true)}
                    className="btn-primary"
                  >
                    영상 업로드하기
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onSubmit={handleUpload}
      />

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium text-primary-600">홈</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium text-gray-500">내 영상</span>
          </button>
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="flex flex-col items-center space-y-1 p-3 bg-primary-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-medium">업로드</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-xs font-medium text-gray-500">좋아요</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium text-gray-500">프로필</span>
          </button>
        </div>
      </div>
    </div>
  );
} 