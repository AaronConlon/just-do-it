import { z } from 'zod'

export const userSearchSchema = z.object({
  keyword: z.string().optional(),
  is_locked: z.string().optional(),
  is_admin: z.string().optional(),
})

export type TUserSearch = z.infer<typeof userSearchSchema>
