import type { FieldValue } from 'firebase/firestore'
import dayjs from 'dayjs'

import type { UserId } from './User'

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

// 毎年12/28~1/3の間は編集可能。もしくはcreatedAtが3日以内の場合も編集可能
export const canEditGoal = (goal: Goal, today: Date): boolean => {
  return (
    dayjs(today).isAfter(dayjs(`${today.getFullYear()}-12-28`)) ||
    dayjs(today).isBefore(dayjs(`${today.getFullYear()}-01-04`)) ||
    dayjs(today).isBefore(dayjs(goal.createdAt).add(3, 'day'))
  )
}
