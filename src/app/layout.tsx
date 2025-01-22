import AppHeader from '@/components/common/AppHeader'
import { globalConfig } from '@/config'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = globalConfig.meta.homepage

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* header */}
        <AppHeader />
        {/* body */}
        <main className="mx-auto max-w-[1300px] p-4">{children}</main>
        {/* footer */}
        <Toaster />
      </body>
    </html>
  )
}
