import { z } from 'zod'

export const discountCodeSchema = z.object({
  discount: z.number().min(0.01).max(1).default(1),
  expired_at: z.number().default(0),
  app_id: z.number(),
  id: z.number().optional(),
  status: z.number(),
  created_at: z.number(),
  code: z.string(),
  account_id: z.number(),
})

export const discountCodePayloadSchema = discountCodeSchema
  .pick({
    app_id: true,
    expired_at: true,
    discount: true,
  })
  .extend({
    count: z.number().default(1),
  })

export type GenerateCodePayload = z.infer<typeof discountCodePayloadSchema>
export type DiscountCode = z.infer<typeof discountCodeSchema>
