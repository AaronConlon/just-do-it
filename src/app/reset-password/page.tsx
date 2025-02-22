'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { updatePassword } from '@/lib/actions/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const safePasswordSchema = z.object({
    password: z.string().min(8, '密码至少8位'),
    confirmPassword: z.string().min(8, '密码至少8位'),
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const result = safePasswordSchema.safeParse({
      password,
      confirmPassword,
    })
    if (result.success === false) {
      toast.error(result.error.issues[0].message)
      return
    }

    if (password !== confirmPassword) {
      toast.error('两次输入的密码不一致')
      return
    }

    try {
      setIsLoading(true)
      const result = await updatePassword(token!, password)

      if (!result.success) {
        throw new Error(result.error)
      }
      toast.success('密码修改成功')
      router.push('/')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '修改失败')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">无效的重置链接</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>重置密码</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">新密码</Label>
              <PasswordInput id="password" name="password" required disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '修改中...' : '确认修改'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}