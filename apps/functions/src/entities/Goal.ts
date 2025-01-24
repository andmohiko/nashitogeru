import type { FieldValue } from 'firebase-admin/firestore'

import type { UserId } from './'

export type GoalId = string

export const goalsCollection = 'goals' as const

export type Goal = {
  goalId: GoalId
  createdAt: Date
  description: string
  isPublished: boolean
  progressRate?: number
  target: string
  updatedAt: Date
  userId: UserId
}

export type UpdateGoalDto = {
  progressRate?: Goal['progressRate']
  updatedAt: FieldValue
}
