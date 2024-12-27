import { z } from 'zod'

export const editProgressSchema = z.object({
  date: z.date(),
  imagePath: z.string(),
  note: z
    .string()
    .max(1000, { message: 'メモは最大1000文字まで入力できます' })
    .optional(),
  progressRate: z
    .number()
    .int()
    .min(0, { message: '達成率は0以上で入力してください' })
    .max(100, { message: '達成率は100以下で入力してください' }),
})

export type EditProgressInputType = z.infer<typeof editProgressSchema>
