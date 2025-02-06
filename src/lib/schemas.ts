import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  created_at: z.number(),
  avatar: z.string().default('https://avatars.githubusercontent.com/u/124599?v=4'),
  is_admin: z.number().min(0).max(1),
  is_locked: z.number().min(0).max(1),
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
  is_locked: z.number().min(0).max(1),
  description: z.string(),
  platform: z.string(),
  tags: z.string(),
  categories: z.string(),
  icon: z.string(),
  url: z.string(),
  is_free: z.number().min(0).max(1),
  user_count: z.number().int(),
  price: z.number().int(),
  detail: z.string(),
  score: z.number().int(),
  screenshots: z.string().optional(),
  youtube_video_url: z.string().optional(),
})

export type TApp = z.infer<typeof AppSchema>