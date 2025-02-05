'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { sendUpdatePasswordEmail, updateProfile } from '@/lib/actions/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { PiLockThin } from 'react-icons/pi'

const AVATAR_OPTIONS = [
  'https://de4965e.webp.li/blog-images/2025/01/696c0c2fdc1cdf20b7b86b932bbb05e5.svg',
  'https://de4965e.webp.li/blog-images/2025/02/499dc4bb5db675c1886264dc88049470.jpg',
  'https://de4965e.webp.li/blog-images/2025/02/8907b6d276786840d7d567ca3bf314e5.png',
  'https://de4965e.webp.li/blog-images/2025/02/888ba705bfd71fbcfa257b1ce4384e73.jpg',
  'https://de4965e.webp.li/blog-images/2025/02/14fa960078c8376aa7b490461e6162db.jpg',
  'https://de4965e.webp.li/blog-images/2025/02/e15dfcbd2f8b1386e9896ef1ef396c25.jpg',
]

interface AccountSettingsProps {
  user: {
    username: string
    avatar: string
    email: string
  }
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSendMailLoading, setIsSendMailLoading] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar)
  const router = useRouter()

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // 检查用户名是否为空
    if (!formData.get('username')) {
      toast.error('用户名不能为空')
      return
    }
    try {
      setIsLoading(true)
      const result = await updateProfile({
        username: formData.get('username') as string,
        avatar: selectedAvatar,
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      toast.success('更新成功')
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '更新失败')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async () => {
    try {
      if (!user.email) {
        toast.error('邮箱不能为空')
        return
      }
      setIsSendMailLoading(true)
      const result = await sendUpdatePasswordEmail(user.email)

      if (!result.success) {
        throw new Error(result.error)
      }
      toast.success('重置密码邮件已发送，请查收')
      toast.success(
        '白嫖的邮件服务，可能会被邮件服务商认为是垃圾邮件，也可能有一定的延迟，请耐心等待几分钟',
        {
          duration: 10000,
          icon: '😭',
        }
      )
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '发送失败')
    } finally {
      setIsSendMailLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                name="username"
                defaultValue={user.username}
                disabled={isLoading}
                maxLength={32}
              />
            </div>

            <div className="space-y-4">
              <Label>选择头像</Label>
              <RadioGroup
                value={selectedAvatar}
                onValueChange={setSelectedAvatar}
                className="grid grid-cols-3 gap-4 sm:grid-cols-6"
              >
                {AVATAR_OPTIONS.map((avatar) => (
                  <div key={avatar} className="group relative">
                    <RadioGroupItem
                      value={avatar}
                      id={avatar}
                      className="peer sr-only"
                      disabled={avatar === user.avatar}
                    />
                    <Label
                      htmlFor={avatar}
                      className="flex cursor-pointer items-center justify-center rounded-lg border-2 p-2 hover:border-orange-400 peer-data-[state=checked]:border-orange-500"
                    >
                      <Image
                        src={avatar}
                        alt="avatar"
                        width={60}
                        height={60}
                        className="group-hover:animate-wiggle group-hover:animate-infinite origin-center transform rounded-lg"
                      />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '更新中...' : '更新信息'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>安全设置</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={handleResetPassword} disabled={isLoading}>
            <PiLockThin className="text-primary" />
            {isSendMailLoading ? '发送中...' : '重置密码'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
