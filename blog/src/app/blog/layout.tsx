
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import BlogHeader from '@/components/BlogHeader'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog Page',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="column h-screen">
      <BlogHeader/>
      {children}
    </div>
  )
}
