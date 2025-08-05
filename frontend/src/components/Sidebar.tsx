'use client';

import { useState } from 'react';
import { 
  Home, 
  Users, 
  Heart, 
  Clock, 
  Settings, 
  HelpCircle, 
  X,
  ChevronRight,
  Video,
  FolderOpen,
  Star,
  Sparkles,
  Crown,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeGroup, setActiveGroup] = useState('가족');

  const navigation = [
    { name: '홈', icon: Home, href: '#', count: null, premium: false },
    { name: '내 영상', icon: Video, href: '#', count: 12, premium: false },
    { name: '좋아요', icon: Heart, href: '#', count: 8, premium: false },
    { name: '최근 시청', icon: Clock, href: '#', count: null, premium: false },
    { name: '설정', icon: Settings, href: '#', count: null, premium: false },
    { name: '도움말', icon: HelpCircle, href: '#', count: null, premium: false },
  ];

  const groups = [
    { name: '가족', icon: Users, memberCount: 5, color: 'bg-gradient-to-br from-blue-500 to-blue-600', premium: false },
    { name: '친구들', icon: Users, memberCount: 8, color: 'bg-gradient-to-br from-green-500 to-green-600', premium: false },
    { name: '팀 프로젝트', icon: Users, memberCount: 12, color: 'bg-gradient-to-br from-purple-500 to-purple-600', premium: true },
    { name: '동호회', icon: Users, memberCount: 15, color: 'bg-gradient-to-br from-orange-500 to-orange-600', premium: true },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="sidebar-mobile"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "sidebar-content",
        isOpen ? "open" : "closed"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold hero-gradient">CloseTube</h2>
                <p className="text-xs text-slate-500 -mt-1">Premium</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl hover:bg-slate-100/80 transition-all duration-300 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-item"
                >
                  <item.icon className="nav-icon" />
                  <span className="nav-text flex-1">{item.name}</span>
                  {item.count && (
                    <span className="badge badge-secondary">
                      {item.count}
                    </span>
                  )}
                  {item.premium && (
                    <Crown className="h-4 w-4 text-amber-500" />
                  )}
                </a>
              ))}
            </div>

            {/* Groups Section */}
            <div className="pt-8 border-t border-slate-200/60">
              <div className="flex items-center justify-between px-4 mb-4">
                <h3 className="text-sm font-bold text-slate-900">그룹</h3>
                <button className="p-1.5 rounded-xl hover:bg-slate-100/80 transition-all duration-300">
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-2">
                {groups.map((group) => (
                  <button
                    key={group.name}
                    onClick={() => setActiveGroup(group.name)}
                    className={cn(
                      "w-full nav-item",
                      activeGroup === group.name && "active"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shadow-md",
                      group.color
                    )}>
                      <group.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="nav-text flex-1">
                      {group.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500 font-medium">
                        {group.memberCount}명
                      </span>
                      {group.premium && (
                        <Crown className="h-3 w-3 text-amber-500" />
                      )}
                      {activeGroup === group.name && (
                        <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/60">
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-4 border border-indigo-200/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-md">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">프리미엄 업그레이드</p>
                  <p className="text-xs text-slate-600">더 많은 기능을 사용해보세요</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <Zap className="h-3 w-3 text-amber-500" />
                  <span>무제한 영상 업로드</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <Star className="h-3 w-3 text-amber-500" />
                  <span>고화질 스트리밍</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600">
                  <Users className="h-3 w-3 text-amber-500" />
                  <span>무제한 그룹 생성</span>
                </div>
              </div>
              <button className="w-full mt-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-semibold py-2.5 px-4 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg">
                업그레이드하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 