import { AdminNav } from '@/components/admin/nav'
import { getUser } from '@/lib/actions/auth'
import { EIsAdmin } from '@/lib/validations/auth'
import { redirect } from 'next/navigation'

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
        <AdminNav />
      </div>

      <div className="w-full">{children}</div>
    </div>
  )
}
