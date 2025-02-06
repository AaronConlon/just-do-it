import { AppsTable } from '@/components/admin/apps-table'
import { getApplications } from '@/lib/actions/application'

export default async function AdminAppsPage() {
  const apps = await getApplications(true)
  console.log('apps update:', apps)
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">应用管理</h2>
        <p className="text-muted-foreground">管理所有应用的信息和状态</p>
      </div>

      <AppsTable apps={apps} />
    </div>
  )
}
