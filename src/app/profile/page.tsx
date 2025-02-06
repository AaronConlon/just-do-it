import { AccountSettings } from '@/components/profile/account-settings'
import { UserApps } from '@/components/profile/user-apps'
import { UserProfile } from '@/components/profile/user-profile'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getMyApps } from '@/lib/actions/application'
import { getUser } from '@/lib/actions/auth'

export default async function Page() {
  const [user, apps] = await Promise.all([getUser(), getMyApps()])

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-semibold">请登录后查看个人中心</h2>
        <p className="text-muted-foreground">登录后可以查看您的应用和个人信息</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
        <UserProfile user={user} apps={apps ?? []} />
        <div className="space-y-6">
          <Tabs defaultValue="apps" className="w-full">
            <TabsList className="w-full max-w-[300px]">
              <TabsTrigger value="apps" className="flex-1 truncate">
                我的应用 ({apps?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">
                账号设置
              </TabsTrigger>
            </TabsList>
            <TabsContent value="apps" className="mt-6">
              <UserApps apps={apps ?? []} />
            </TabsContent>
            <TabsContent value="settings" className="mt-6">
              <AccountSettings user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
