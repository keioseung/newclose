'use client'

import { useState } from 'react'
import { 
  Home, 
  Video, 
  Heart, 
  Clock, 
  Users, 
  Plus, 
  UserPlus, 
  Settings,
  Menu
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('home')

  const menuItems = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'videos', icon: Video, label: '내 영상' },
    { id: 'likes', icon: Heart, label: '좋아요' },
    { id: 'history', icon: Clock, label: '시청 기록' },
  ]

  const groups = [
    { name: '가족', count: 4 },
    { name: '친구들', count: 6 },
    { name: '팀 프로젝트', count: 3 },
  ]

  const tools = [
    { icon: Plus, label: '새 그룹 만들기' },
    { icon: UserPlus, label: '멤버 초대' },
    { icon: Settings, label: '설정' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <nav className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">CloseTube</span>
            </div>
          </div>

          {/* Menu */}
          <div className="flex-1 overflow-y-auto">
            {/* My Channel */}
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                내 채널
              </h3>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveItem(item.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        activeItem === item.id
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Groups */}
            <div className="px-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                그룹
              </h3>
              <ul className="space-y-2">
                {groups.map((group) => (
                  <li key={group.name}>
                    <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5" />
                        <span>{group.name}</span>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {group.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="px-6 mt-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                도구
              </h3>
              <ul className="space-y-2">
                {tools.map((tool) => (
                  <li key={tool.label}>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                      <tool.icon className="w-5 h-5" />
                      <span>{tool.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
} 