import { z } from 'zod'
import { IData } from './basic'

export const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少6位'),
})

export const registerSchema = z
  .object({
    email: z.string().email('请输入有效的邮箱地址'),
    password: z.string().min(6, '密码至少6位'),
    username: z.string().min(2, '用户名至少2位'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  })

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>

export enum EAccountStatus {
  ACTIVE = 0,
  INACTIVE = 1,
  SUSPENDED = 2,
}

export enum EIsAdmin {
  NO = 0,
  YES = 1,
}

interface AuthData {
  user: {
    username: string
    email: string
    status: EAccountStatus
    app_ids: number[]
    avatar: string
    id?: number
    created_at: number
    is_admin: EIsAdmin
  }
  token: string
}

export type AuthResponse = IData<AuthData>

interface RegisterData {
  token: string
}

export type RegisterResponse = IData<RegisterData>
