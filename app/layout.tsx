import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ad Banner Creator',
  description: 'Create and edit ad banners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}