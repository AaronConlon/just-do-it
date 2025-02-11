import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Rating } from '@/components/ui/raiting'
import { getApplicationById } from '@/lib/actions/application'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PiLinkThin, PiUserThin } from 'react-icons/pi'
import Markdown from 'react-markdown'

import { PurchaseButton } from '@/components/apps/purchase-button'
import { getUser } from '@/lib/actions/auth'
import Link from 'next/link'

export default async function AppDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [app, user] = await Promise.all([getApplicationById(id), getUser()])

  console.log('app: ', app)
  console.log('user: ', user)

  // let apps = [] as TApp[]
  if (!app) {
    notFound()
  }

  // if (user) {
  //   // get apps
  //   const myApps = await getMyApps()
  //   if (myApps?.length) {
  //     apps = myApps
  //   }
  // }

  // 检查用户是否拥有该应用
  const hasOwned = user?.app_ids?.includes(~~id)

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Image
              src={app.icon}
              alt={app.app_name}
              width={80}
              height={80}
              className="rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold">{app.app_name}</h1>
              <p className="text-muted-foreground">{app.categories}</p>
            </div>
          </div>

          <div className="prose max-w-none dark:prose-invert">
            <p>{app.description}</p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold">标签</h2>
            <div className="flex flex-wrap gap-2">
              {app.tags
                ?.split(';')
                ?.filter((i) => i.length)
                .map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="not-prose markdown-body">
            <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-pre:bg-muted prose-pre:p-4">
              <Markdown
                components={{
                  // 自定义链接在新标签页打开
                  a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
                  // 自定义图片样式
                  img: ({ ...props }) => <img className="rounded-lg" {...props} />,
                  // 自定义代码块样式
                  pre: ({ ...props }) => <pre className="overflow-x-auto rounded-lg" {...props} />,
                  // 自定义行内代码样式
                  code: ({ ...props }) =>
                    // @ts-ignore
                    props['inline'] ? (
                      <code className="rounded bg-muted px-1.5 py-0.5" {...props} />
                    ) : (
                      <code {...props} />
                    ),
                }}
              >
                {app.detail || '暂无详细信息'}
              </Markdown>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="mb-4 text-xl font-semibold">应用信息</h2>
              {app.canEdit && (
                <Link
                  href={`/admin/apps/edit?id=${app.id}`}
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <PiLinkThin />
                  编辑
                </Link>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">价格</span>
                <div>
                  {app.is_free ? (
                    <Badge variant="success">免费</Badge>
                  ) : (
                    <span className="font-semibold text-primary">
                      ¥{app.price?.toFixed(2) || '未定价'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">用户数量</span>
                <div className="flex items-center gap-2">
                  <PiUserThin size={20} />
                  <span>{app.user_count || 0}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">评分</span>
                <Rating size="sm" max={5} disabled value={app.score} className="text-orange-400" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">发布时间</span>
                <span>
                  {format(new Date(app.created_at), 'yyyy年MM月dd日', {
                    locale: zhCN,
                  })}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {user ? (
                <PurchaseButton
                  appId={~~id}
                  price={app.price || 0}
                  isFree={!!app.is_free}
                  hasOwned={!!hasOwned}
                />
              ) : (
                <Button className="w-full" variant="outline" asChild>
                  {/* <Link href="/login">登录后购买</Link> */}
                  登录后购买
                </Button>
              )}

              <Button className="w-full" variant="outline" asChild>
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  访问应用 <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
