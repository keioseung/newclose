'use client';

import { useState } from 'react';
import { X, Upload, Link, Users, Lock, Globe, Eye, EyeOff, Sparkles, Crown, Zap } from 'lucide-react';
import { VideoUploadData } from '@/types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VideoUploadData) => void;
}

export default function UploadModal({ isOpen, onClose, onSubmit }: UploadModalProps) {
  const [formData, setFormData] = useState<VideoUploadData>({
    url: '',
    title: '',
    description: '',
    group: '',
    allowDownload: false,
    allowExternalShare: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const groups = [
    { id: '', name: '그룹 선택 안함', icon: Users },
    { id: 'family', name: '가족', icon: Users },
    { id: 'friends', name: '친구들', icon: Users },
    { id: 'work', name: '팀 프로젝트', icon: Users, premium: true },
    { id: 'hobby', name: '동호회', icon: Users, premium: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
      setFormData({
        url: '',
        title: '',
        description: '',
        group: '',
        allowDownload: false,
        allowExternalShare: false,
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content scale-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">영상 업로드</h2>
              <p className="text-sm text-slate-600">URL을 통해 영상을 공유하세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl hover:bg-slate-100/80 transition-all duration-300"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Video URL */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              영상 URL
            </label>
            <div className="relative">
              <Link className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="url"
                required
                placeholder="YouTube, Instagram, TikTok URL을 입력하세요"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="input-field pl-12"
              />
            </div>
            <p className="text-xs text-slate-500 flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-indigo-500" />
              <span>지원 플랫폼: YouTube, Instagram, TikTok</span>
            </p>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              제목
            </label>
            <input
              type="text"
              required
              placeholder="영상 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
            />
          </div>

          {/* Description */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              설명
            </label>
            <textarea
              placeholder="영상에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="input-field resize-none"
            />
          </div>

          {/* Group Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              공유 그룹
            </label>
            <div className="relative">
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="input-field pl-12 appearance-none"
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} {group.premium && '(Premium)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Lock className="h-4 w-4 text-indigo-600" />
              <span>개인정보 설정</span>
            </h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-4 rounded-2xl border border-slate-200/60 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.allowDownload}
                  onChange={(e) => setFormData({ ...formData, allowDownload: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Globe className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">다운로드 허용</span>
                    <p className="text-xs text-slate-500">사용자가 영상을 다운로드할 수 있습니다</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 rounded-2xl border border-slate-200/60 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.allowExternalShare}
                  onChange={(e) => setFormData({ ...formData, allowExternalShare: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                    <Eye className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-700">외부 공유 허용</span>
                    <p className="text-xs text-slate-500">외부 플랫폼에서 공유할 수 있습니다</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Premium Features */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-200/50">
            <div className="flex items-center space-x-2 mb-3">
              <Crown className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-800">프리미엄 기능</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-amber-700">
                <Zap className="h-3 w-3" />
                <span>고화질 스트리밍 (4K)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-amber-700">
                <Sparkles className="h-3 w-3" />
                <span>무제한 업로드</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-amber-700">
                <Users className="h-3 w-3" />
                <span>무제한 그룹 생성</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>업로드 중...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>업로드</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 