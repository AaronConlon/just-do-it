import { getUser } from '@/lib/actions/auth'
import { EIsAdmin } from '@/lib/validations/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const user = await getUser()

  if (user?.is_admin !== EIsAdmin.YES) {
    redirect('/')
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">概览</h2>
        <p className="text-muted-foreground">查看系统整体运行状况</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{/* 数据卡片将在这里实现 */}</div>
    </div>
  )
}
