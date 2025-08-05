'use client';

import { useState } from 'react';
import { Search, Menu, Upload, Bell, User, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
  onUploadClick: () => void;
}

export default function Header({ onMenuToggle, onUploadClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-2xl border-b border-slate-200/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu and Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="p-2.5 rounded-2xl hover:bg-slate-100/80 transition-all duration-300 md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-slate-600" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold hero-gradient">
                  CloseTube
                </h1>
                <p className="text-xs text-slate-500 -mt-1">Premium</p>
              </div>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className={cn(
              "search-bar transition-all duration-500",
              isSearchFocused && "scale-105"
            )}>
              <Search className="search-icon h-5 w-5" />
              <input
                type="text"
                placeholder="영상, 제목, 또는 작성자로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-xl hover:bg-slate-100 transition-all duration-300"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Upload Button */}
            <button
              onClick={onUploadClick}
              className="btn-primary hidden sm:flex items-center space-x-2"
            >
              <Upload className="h-4 w-4" />
              <span>업로드</span>
            </button>
            
            {/* Mobile Upload Button */}
            <button
              onClick={onUploadClick}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-300 sm:hidden"
              aria-label="Upload video"
            >
              <Upload className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button className="p-2.5 rounded-2xl hover:bg-slate-100/80 transition-all duration-300 relative group">
              <Bell className="h-5 w-5 text-slate-600 group-hover:text-indigo-600 transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></span>
            </button>

            {/* User Profile */}
            <button className="p-2.5 rounded-2xl hover:bg-slate-100/80 transition-all duration-300 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 