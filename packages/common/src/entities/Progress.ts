import type { FieldValue } from 'firebase/firestore'

export type ProgressId = string

export const progressesCollection = 'progresses' as const

export type Progress = {
  progressId: ProgressId
  createdAt: Date
  imagePaths: Array<string>
  note: string
  progressRate: number
  updatedAt: Date
}

export type CreateProgressDto = Omit<
  Progress,
  'progressId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateProgressDto = {
  imagePaths?: Progress['imagePaths']
  note?: Progress['note']
  progressRate?: Progress['progressRate']
  updatedAt: FieldValue
}
