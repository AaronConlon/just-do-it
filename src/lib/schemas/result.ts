import { z } from 'zod'

export const ResultCountSchema = z.object({
  successCount: z.number(),
  failedCount: z.number(),
})

export type ResultCount = z.infer<typeof ResultCountSchema>
