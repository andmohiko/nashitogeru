import type { GoalId, ProgressId } from '@nashitogeru/common'

import {
  createProgressOperation,
  deleteProgressOperation,
  updateProgressOperation,
} from '~/infrastructures/firestore/ProgressOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import type { EditProgressInputType } from '~/features/progress/types'

export const useMutateProgress = (): {
  createProgress: (goalId: GoalId, data: EditProgressInputType) => void
  updateProgress: (
    goalId: GoalId,
    progressId: ProgressId,
    data: EditProgressInputType,
  ) => void
  deleteProgress: (goalId: GoalId, progressId: ProgressId) => void
} => {
  const { uid } = useFirebaseAuthContext()

  const createProgress = async (
    goalId: GoalId,
    data: EditProgressInputType,
  ) => {
    if (!uid) {
      throw new Error('再ログインしてください')
    }

    await createProgressOperation(goalId, {
      createdAt: serverTimestamp,
      date: data.date,
      imagePaths: [data.imagePath],
      note: data.note ?? '',
      progressRate: data.progressRate,
      updatedAt: serverTimestamp,
    })
  }

  const updateProgress = async (
    goalId: GoalId,
    progressId: ProgressId,
    data: EditProgressInputType,
  ) => {
    if (!uid) {
      throw new Error('再ログインしてください')
    }

    await updateProgressOperation(goalId, progressId, {
      date: data.date,
      imagePaths: [data.imagePath],
      note: data.note ?? '',
      progressRate: data.progressRate,
      updatedAt: serverTimestamp,
    })
  }

  const deleteProgress = async (goalId: GoalId, progressId: ProgressId) => {
    if (!uid) {
      throw new Error('再ログインしてください')
    }

    await deleteProgressOperation(goalId, progressId)
  }

  return {
    createProgress,
    updateProgress,
    deleteProgress,
  }
}
