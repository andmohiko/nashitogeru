import { z } from 'zod'

export const editGoalSchema = z.object({
  target: z
    .string()
    .min(1, { message: '成し遂げることは必須です' })
    .max(100, { message: '成し遂げることは100文字以内で入力してください' }),
  description: z.string().optional(),
})

export type EditGoalInputType = z.infer<typeof editGoalSchema>
