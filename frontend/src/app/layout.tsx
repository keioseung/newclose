import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CloseTube - 나만의 소중한 사람들과 영상 공유',
  description: '가족, 친구들과만 공유하는 프라이빗 영상 플랫폼',
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