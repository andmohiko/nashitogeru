import type * as admin from 'firebase-admin'

import type { Progress, ProgressId } from '~/entities/Progress'
import { convertDate } from '~/utils/convertDate'

const dateColumns: Array<string> = ['createdAt']

export const convertProgressForSnapOperation = (
  progressId: ProgressId,
  data: admin.firestore.DocumentData,
): Progress => {
  return {
    progressId,
    ...convertDate(data, dateColumns),
  } as Progress
}
