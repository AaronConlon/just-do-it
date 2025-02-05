'use client'

import { useScroll } from '@/lib/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export default function HeaderBox({ children }: PropsWithChildren) {
  const scrolled = useScroll(50)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        scrolled && 'border-b shadow-sm'
      )}
    >
      {children}
    </header>
  )
}
