'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/admin/dashboard',
      label: '概览',
    },
    {
      href: '/admin/apps',
      label: '应用管理',
    },
    {
      href: '/admin/users',
      label: '用户管理',
    },
  ]

  return (
    <nav className="flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.includes(item.href) ? 'font-semibold text-primary' : 'text-muted-foreground'
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
