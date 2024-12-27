import type { GoalId, ProgressId } from '@nashitogeru/common'

import {
  createProgressOperation,
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
      imagePaths: [],
      note: data.note ?? '',
      progressRate: 0,
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
      imagePaths: [],
      note: data.note ?? '',
      progressRate: 0,
      updatedAt: serverTimestamp,
    })
  }

  return {
    createProgress,
    updateProgress,
  }
}