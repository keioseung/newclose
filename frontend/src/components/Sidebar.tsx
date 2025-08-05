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
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeGroup, setActiveGroup] = useState('가족');

  const navigation = [
    { name: '홈', icon: Home, href: '#', count: null },
    { name: '내 영상', icon: Video, href: '#', count: 12 },
    { name: '좋아요', icon: Heart, href: '#', count: 8 },
    { name: '최근 시청', icon: Clock, href: '#', count: null },
    { name: '설정', icon: Settings, href: '#', count: null },
    { name: '도움말', icon: HelpCircle, href: '#', count: null },
  ];

  const groups = [
    { name: '가족', icon: Users, memberCount: 5, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { name: '친구들', icon: Users, memberCount: 8, color: 'bg-gradient-to-br from-green-500 to-green-600' },
    { name: '팀 프로젝트', icon: Users, memberCount: 12, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { name: '동호회', icon: Users, memberCount: 15, color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <h2 className="text-lg font-bold gradient-text">CloseTube</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors duration-200" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>
                  {item.count && (
                    <span className="badge badge-secondary">
                      {item.count}
                    </span>
                  )}
                </a>
              ))}
            </div>

            {/* Groups Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between px-4 mb-3">
                <h3 className="text-sm font-semibold text-gray-900">그룹</h3>
                <button className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-1">
                {groups.map((group) => (
                  <button
                    key={group.name}
                    onClick={() => setActiveGroup(group.name)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                      activeGroup === group.name
                        ? "bg-primary-50 border border-primary-200"
                        : "hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        group.color
                      )}>
                        <group.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        activeGroup === group.name
                          ? "text-primary-700"
                          : "text-gray-700 group-hover:text-gray-900"
                      )}>
                        {group.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {group.memberCount}명
                      </span>
                      {activeGroup === group.name && (
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-100">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">프리미엄 업그레이드</p>
                <p className="text-xs text-gray-600">더 많은 기능을 사용해보세요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 