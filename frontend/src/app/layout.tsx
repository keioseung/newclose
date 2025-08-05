import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CloseTube - 프라이빗 영상 공유 플랫폼',
  description: '가족, 친구, 팀과 함께 안전하게 영상을 공유하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 