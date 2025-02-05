'use client'

import { login, sendUpdatePasswordEmail } from '@/lib/actions/auth'
import { LoginForm, loginSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { PasswordInput } from '../ui/password-input'

export function LoginDialog() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '443009976@qq.com',
      password: '12345678',
    },
  })

  const emailValue = watch('email')

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data)
      console.log('result in component:', result)
      if (result.success) {
        toast.success('登录成功')
        router.refresh() // 刷新页面以更新服务端状态
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('登录失败')
    }
  }

  const handleForgotPassword = async () => {
    if (!emailValue) {
      toast.error('请输入邮箱')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailValue)) {
      toast.error('请输入有效的邮箱地址')
      return
    }

    try {
      const result = await sendUpdatePasswordEmail(emailValue)
      if (result.success) {
        toast.success('重置密码邮件已发送，请查收')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '发送失败')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">登录</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>登录账号</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="email">邮箱</Label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                忘记密码？
              </button>
            </div>
            <Input {...register('email')} type="email" placeholder="请输入邮箱" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <PasswordInput {...register('password')} placeholder="请输入密码" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '登录中...' : '登录'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
