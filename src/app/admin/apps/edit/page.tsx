'use client'

import { AppCodes } from '@/components/admin/app-codes'
import { ArticleTab } from '@/components/admin/app-tabs/article'
import { BasicInfoTab } from '@/components/admin/app-tabs/basic-info'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAppAction } from '@/lib/actions/admin'
import { TApp } from '@/lib/schemas'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PiArrowLeft } from 'react-icons/pi'

export default function EditAppPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [app, setApp] = useState<TApp | null>(null)

  useEffect(() => {
    if (id) {
      getAppAction(Number(id)).then((res) => {
        const { data } = res
        if (data) {
          setApp(data)
        }
      })
    }
  }, [id])

  if (!app) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/apps">
            <Button variant="ghost" size="icon">
              <PiArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-2xl font-bold">编辑应用 - {app.app_name}</h2>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="article">文章编辑</TabsTrigger>
          <TabsTrigger value="discount">折扣代码</TabsTrigger>
        </TabsList>
        <TabsContent value="basic" className="space-y-4">
          <BasicInfoTab app={app} />
        </TabsContent>
        <TabsContent value="article" className="space-y-4">
          <ArticleTab app={app} />
        </TabsContent>
        <TabsContent value="discount" className="space-y-4">
          <AppCodes appId={app.id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
