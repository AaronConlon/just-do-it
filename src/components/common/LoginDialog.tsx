'use client'

import { login } from '@/lib/actions/auth'
import { LoginForm, loginSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function LoginDialog() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'rivenqinyy@gmail.com',
      password: '123456',
    },
  })

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
            <Label htmlFor="email">邮箱</Label>
            <Input {...register('email')} type="email" placeholder="请输入邮箱" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <Input {...register('password')} type="password" placeholder="请输入密码" />
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
