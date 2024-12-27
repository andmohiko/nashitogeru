import { z } from 'zod'

export const editProgressSchema = z.object({
  date: z.date(),
  imagePath: z.string(),
  note: z
    .string()
    .max(1000, { message: 'メモは最大1000文字まで入力できます' })
    .optional(),
})

export type EditProgressInputType = z.infer<typeof editProgressSchema>
