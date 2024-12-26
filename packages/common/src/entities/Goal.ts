import type { FieldValue } from 'firebase/firestore'

import type { UserId } from './User'

export type GoalId = string

export const goalsCollection = 'goals' as const

export type Goal = {
  goalId: GoalId
  createdAt: Date
  description: string
  isPublished: boolean
  target: string
  updatedAt: Date
  userId: UserId
}

export type CreateGoalDto = Omit<Goal, 'goalId' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateGoalDto = {
  description?: Goal['description']
  isPublished?: Goal['isPublished']
  target?: Goal['target']
  updatedAt: FieldValue
}
