import type { GoalId } from '@nashitogeru/common'

import { updateGoalOperation } from '~/infrastructures/firestore/GoalOperations'
import { serverTimestamp } from '~/lib/firebase'

export const useTogglePublishGoal = (): {
  publishGoal: (goalId: GoalId) => Promise<void>
  unpublishGoal: (goalId: GoalId) => Promise<void>
} => {
  const publishGoal = async (goalId: GoalId) => {
    await updateGoalOperation(goalId, {
      isPublished: true,
      updatedAt: serverTimestamp,
    })
  }

  const unpublishGoal = async (goalId: GoalId) => {
    await updateGoalOperation(goalId, {
      isPublished: false,
      updatedAt: serverTimestamp,
    })
  }

  return {
    publishGoal,
    unpublishGoal,
  }
}
