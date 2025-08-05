'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import VideoCard from '@/components/VideoCard';
import UploadModal from '@/components/UploadModal';
import { Video } from '@/types';
import { fetchVideos, createVideo } from '@/lib/api';
import { Sparkles, TrendingUp, Users, Clock, Heart, Upload } from 'lucide-react';

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
    { id: 'all', name: '전체', count: videos.length, icon: Sparkles },
    { id: 'family', name: '가족', count: videos.filter(v => v.group === '가족').length, icon: Heart },
    { id: 'friends', name: '친구들', count: videos.filter(v => v.group === '친구들').length, icon: Users },
    { id: 'work', name: '팀 프로젝트', count: videos.filter(v => v.group === '팀 프로젝트').length, icon: TrendingUp },
    { id: 'hobby', name: '동호회', count: videos.filter(v => v.group === '동호회').length, icon: Clock },
  ];

  const stats = [
    { label: '총 영상', value: videos.length, icon: Upload },
    { label: '총 조회수', value: videos.reduce((sum, v) => sum + v.views, 0), icon: TrendingUp },
    { label: '총 좋아요', value: videos.reduce((sum, v) => sum + v.likes, 0), icon: Heart },
    { label: '총 댓글', value: videos.reduce((sum, v) => sum + v.comments, 0), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
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
            {/* Hero Section */}
            <div className="text-center mb-12 fade-in">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full border border-indigo-200/50 mb-6">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">CloseTube Premium</span>
              </div>
              <h1 className="section-title">
                소중한 순간을<br />
                <span className="hero-gradient">함께 공유하세요</span>
              </h1>
              <p className="section-subtitle">
                가족, 친구, 팀과 함께 안전하고 프라이빗하게 영상을 공유하는 새로운 경험을 시작하세요
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 slide-up">
              {stats.map((stat, index) => (
                <div key={index} className="stats-card">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="stats-number">{stat.value.toLocaleString()}</div>
                      <div className="stats-label">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="mb-12 slide-up">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">카테고리별 영상</h2>
              <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide pb-4">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`
                      filter-button ${activeFilter === filter.id ? 'active' : 'inactive'}
                    `}
                  >
                    <filter.icon className="h-4 w-4" />
                    <span>{filter.name}</span>
                    <span className={`
                      text-xs px-2 py-1 rounded-full font-semibold
                      ${activeFilter === filter.id
                        ? 'bg-indigo-200 text-indigo-800'
                        : 'bg-slate-100 text-slate-600'
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
                    <div className="p-6 space-y-4">
                      <div className="skeleton h-5 w-3/4"></div>
                      <div className="skeleton h-4 w-1/2"></div>
                      <div className="skeleton h-4 w-1/4"></div>
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
              <div className="empty-state">
                <div className="empty-icon">
                  <Upload className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="empty-title">
                  {activeFilter === 'all' 
                    ? '첫 번째 영상을 업로드해보세요!'
                    : '이 그룹에는 아직 영상이 없습니다.'
                  }
                </h3>
                <p className="empty-description">
                  {activeFilter === 'all' 
                    ? '소중한 순간을 기록하고 사랑하는 사람들과 공유해보세요'
                    : '이 그룹에 첫 번째 영상을 업로드해보세요'
                  }
                </p>
                {activeFilter === 'all' && (
                  <button
                    onClick={() => setUploadModalOpen(true)}
                    className="btn-primary"
                  >
                    <Upload className="h-4 w-4 mr-2" />
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
        <div className="flex items-center justify-around py-4">
          <button className="flex flex-col items-center space-y-1 p-2 rounded-2xl hover:bg-slate-100/80 transition-all duration-300">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="text-xs font-medium text-indigo-600">홈</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-2xl hover:bg-slate-100/80 transition-all duration-300">
            <Upload className="h-6 w-6 text-slate-500" />
            <span className="text-xs font-medium text-slate-500">내 영상</span>
          </button>
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="flex flex-col items-center space-y-1 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <Upload className="h-6 w-6" />
            <span className="text-xs font-medium">업로드</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-2xl hover:bg-slate-100/80 transition-all duration-300">
            <Heart className="h-6 w-6 text-slate-500" />
            <span className="text-xs font-medium text-slate-500">좋아요</span>
          </button>
          <button className="flex flex-col items-center space-y-1 p-2 rounded-2xl hover:bg-slate-100/80 transition-all duration-300">
            <Users className="h-6 w-6 text-slate-500" />
            <span className="text-xs font-medium text-slate-500">프로필</span>
          </button>
        </div>
      </div>
    </div>
  );
} 