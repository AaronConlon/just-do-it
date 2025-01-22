'use client'

import { register } from '@/lib/actions/auth'
import { RegisterForm, registerSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { PasswordInput } from '../ui/password-input'

export function RegisterDialog() {
  const router = useRouter()
  const {
    register: registerField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: 'Aaron',
      email: 'rivenqinyy@gmail.com',
      password: '123456',
      confirmPassword: '123456',
    },
  })

  const onSubmit = async (data: RegisterForm) => {
    try {
      const result = await register(data)
      if (result.success) {
        toast.success('注册成功')
        router.refresh()
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error(error)
      toast.error('注册失败')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">注册</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>注册账号</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">用户名</Label>
            <Input {...registerField('username')} placeholder="请输入用户名" />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">邮箱</Label>
            <Input {...registerField('email')} type="email" placeholder="请输入邮箱" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">密码</Label>
            <PasswordInput {...registerField('password')} placeholder="请输入密码" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">确认密码</Label>
            <PasswordInput {...registerField('confirmPassword')} placeholder="请再次输入密码" />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '注册中...' : '注册'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
