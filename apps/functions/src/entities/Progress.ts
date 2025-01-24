export type ProgressId = string

export const progressesCollection = 'progresses' as const

export type Progress = {
  progressId: ProgressId
  createdAt: Date
  date: Date
  imagePaths: Array<string>
  note: string
  progressRate: number
  updatedAt: Date
}
