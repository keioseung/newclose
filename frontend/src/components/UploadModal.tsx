'use client'

import { useState } from 'react'
import { X, Upload, Link } from 'lucide-react'
import { VideoUploadData } from '@/types'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: VideoUploadData) => void
}

export default function UploadModal({ isOpen, onClose, onSubmit }: UploadModalProps) {
  const [formData, setFormData] = useState<VideoUploadData>({
    title: '',
    description: '',
    url: '',
    group: '전체',
    privacy: 'private',
    downloadDisabled: true,
    externalShareDisabled: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">새 영상 업로드</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              영상 URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="YouTube, Instagram, TikTok URL을 입력하세요"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="input-field pl-10"
                required
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              지원 플랫폼: YouTube, Instagram, TikTok
            </p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              placeholder="영상 제목을 입력하세요"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              placeholder="영상에 대한 설명을 입력하세요"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field resize-none"
              rows={3}
            />
          </div>

          {/* Group Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공유 그룹
            </label>
            <select
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              className="input-field"
            >
              <option>전체</option>
              <option>가족</option>
              <option>친구들</option>
              <option>팀 프로젝트</option>
            </select>
          </div>

          {/* Privacy Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              프라이버시 설정
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.downloadDisabled}
                  onChange={(e) => setFormData({ ...formData, downloadDisabled: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">다운로드 금지</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.externalShareDisabled}
                  onChange={(e) => setFormData({ ...formData, externalShareDisabled: e.target.checked })}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">외부 공유 금지</span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary"
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  )
} 