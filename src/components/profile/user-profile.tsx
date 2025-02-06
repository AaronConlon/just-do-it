'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TApp } from '@/lib/schemas'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils/date'
import { AuthResponse } from '@/lib/validations/auth'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface UserProfileProps {
  user: AuthResponse['data']['user']
  apps: TApp[]
}

export function UserProfile({ user, apps }: UserProfileProps) {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Avatar
              className={cn(
                'h-24 w-24 ring-2 ring-gray-100 ring-offset-2 transition-shadow duration-200',
                'hover:ring-primary hover:ring-offset-4',
                'cursor-pointer select-none'
              )}
            >
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="text-2xl">
                {user.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          <div className="text-center">
            <h3 className="text-lg font-medium">{user.username}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">注册时间</span>
            <span>{formatDate(user.created_at)}</span>
          </div>

          {!!apps?.length && (
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">应用</span>
              <div className="grid grid-cols-3 gap-2">
                {apps?.map((app) => (
                  <Link
                    key={app.id}
                    href={`/apps/${app.id}`}
                    className="group flex items-center justify-center rounded-lg border p-2 transition-colors hover:border-primary"
                  >
                    <Image
                      src={app.icon}
                      alt={app.app_name}
                      width={32}
                      height={32}
                      className="rounded transition-transform group-hover:scale-110"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
