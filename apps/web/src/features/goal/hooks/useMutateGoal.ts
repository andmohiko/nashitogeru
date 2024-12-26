import type { GoalId } from '@nashitogeru/common'

import type { EditGoalInputType } from '~/features/goal/types'
import {
  createGoalOperation,
  updateGoalOperation,
} from '~/infrastructures/firestore/GoalOperations'
import { serverTimestamp } from '~/lib/firebase'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const useMutateGoal = (): {
  createGoal: (data: EditGoalInputType) => Promise<void>
  updateGoal: (goalId: GoalId, data: EditGoalInputType) => Promise<void>
} => {
  const { uid } = useFirebaseAuthContext()

  const createGoal = async (data: EditGoalInputType) => {
    if (!uid) {
      throw new Error('再ログインしてください')
    }

    await createGoalOperation({
      createdAt: serverTimestamp,
      description: data.description ?? '',
      isPublished: false,
      target: data.target,
      updatedAt: serverTimestamp,
      userId: uid,
    })
  }

  const updateGoal = async (goalId: GoalId, data: EditGoalInputType) => {
    if (!uid) {
      throw new Error('再ログインしてください')
    }

    await updateGoalOperation(goalId, {
      description: data.description ?? '',
      target: data.target,
      updatedAt: serverTimestamp,
    })
  }

  return {
    createGoal,
    updateGoal,
  }
}
