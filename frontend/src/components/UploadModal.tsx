'use client';

import { useState } from 'react';
import { X, Upload, Link, Users, Lock, Globe, Eye, EyeOff } from 'lucide-react';
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
    { id: '', name: '그룹 선택 안함' },
    { id: 'family', name: '가족' },
    { id: 'friends', name: '친구들' },
    { id: 'work', name: '팀 프로젝트' },
    { id: 'hobby', name: '동호회' },
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">영상 업로드</h2>
              <p className="text-sm text-gray-600">URL을 통해 영상을 공유하세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Video URL */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              영상 URL
            </label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                required
                placeholder="YouTube, Instagram, TikTok URL을 입력하세요"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="input-field pl-10"
              />
            </div>
            <p className="text-xs text-gray-500">
              지원 플랫폼: YouTube, Instagram, TikTok
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
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
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
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
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              공유 그룹
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="input-field pl-10 appearance-none"
              >
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">개인정보 설정</h3>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowDownload}
                  onChange={(e) => setFormData({ ...formData, allowDownload: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">다운로드 허용</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.allowExternalShare}
                  onChange={(e) => setFormData({ ...formData, allowExternalShare: e.target.checked })}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">외부 공유 허용</span>
                </div>
              </label>
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