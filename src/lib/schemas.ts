import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string().datetime(),
  avatar: z.string().default('https://avatars.githubusercontent.com/u/124599?v=4'),
})

export type TUser = z.infer<typeof UserSchema>

export enum EAppStatus {
  DEV,
  PROD,
}

export const AppSchema = z.object({
  id: z.number(),
  app_name: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
  // number 0 or 1
  status: z.number().int().min(0).max(1),
  description: z.string(),
  platform: z.string(),
  tags: z.string(),
  categories: z.string(),
  icon: z.string(),
  url: z.string(),
  is_free: z.number().int().min(0).max(1),
  user_count: z.number().int(),
  score: z.number().int(),
  price: z.number().int(),
  detail: z.string(),
})

export type TApp = z.infer<typeof AppSchema>