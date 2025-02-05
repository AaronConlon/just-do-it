import { TApp } from '@/lib/schemas'
import { Card } from '../ui/card'
import { ApplicationCard } from '../views/homepage/application-card'

interface UserAppsProps {
  apps: TApp[]
}

export function UserApps({ apps }: UserAppsProps) {
  if (!apps?.length) {
    return (
      <Card className="flex min-h-[200px] flex-col items-center justify-center space-y-2 p-8 text-center">
        <p className="text-lg font-medium">暂无应用</p>
        <p className="text-sm text-muted-foreground">您还没有购买任何应用，快去应用商店看看吧</p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">我的应用</h3>
          <p className="text-sm text-muted-foreground">共 {apps.length} 个应用</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {apps.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  )
}
