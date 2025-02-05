import { globalConfig } from '@/config'
import { Github, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function AppFooter() {
  return (
    <footer className="mt-auto border-t bg-background/95">
      <div className="container mx-auto py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* 关于我们 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">关于</h3>
            <p className="text-sm text-muted-foreground">
              {globalConfig.site.description.split('<br>')[0]}
            </p>
            <p className="text-sm text-muted-foreground">
              {globalConfig.site.description.split('<br>')[1]}
            </p>
          </div>

          {/* 快速链接 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/apps" className="text-muted-foreground hover:text-primary">
                  应用列表
                </Link>
              </li>
              <li>
                <Link
                  href={globalConfig.socials.blog.url}
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  技术博客
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">联系我们</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {globalConfig.contact.email}
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Github className="h-4 w-4" />
                <Link
                  href={globalConfig.socials.github.url}
                  target="_blank"
                  className="hover:text-primary"
                >
                  {globalConfig.socials.github.name}
                </Link>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Twitter className="h-4 w-4" />
                <Link
                  href={globalConfig.socials.twitter.url}
                  target="_blank"
                  className="hover:text-primary"
                >
                  {globalConfig.socials.twitter.name}
                </Link>
              </li>
            </ul>
          </div>

          {/* 订阅更新 */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">订阅更新</h3>
            <p className="text-sm text-muted-foreground">关注我的微信公众号，获取最新动态</p>
            <img
              src={globalConfig.contact.qrcode}
              alt="微信公众号"
              className="h-32 w-32 rounded-lg"
            />
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 {globalConfig.site.name}. All rights reserved.</p>
          <p className="mt-1">
            Made with ❤️ by{' '}
            <Link
              href={globalConfig.socials.github.url}
              target="_blank"
              className="font-medium hover:text-primary"
            >
              {globalConfig.author.name}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
