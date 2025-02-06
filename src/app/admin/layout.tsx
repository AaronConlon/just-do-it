import { buttonVariants } from '@/components/ui/button'
import { getUser } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'
import { EIsAdmin } from '@/lib/validations/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const navItems = [
  {
    title: '概览',
    href: '/admin',
  },
  {
    title: '应用管理',
    href: '/admin/apps',
  },
  {
    title: '用户管理',
    href: '/admin/users',
  },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (user?.is_admin !== EIsAdmin.YES) {
    redirect('/')
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">管理后台</h1>
          <p className="mt-2 text-muted-foreground">管理应用和用户</p>
        </div>
        <nav className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'hover:bg-transparent hover:underline'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="w-full">{children}</div>
    </div>
  )
}
