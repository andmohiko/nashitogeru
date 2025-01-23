import type { Goal, GoalId } from '@nashitogeru/common'
import { useEffect, useState } from 'react'

import { fetchGoalByIdOperation } from '~/infrastructures/firestore/GoalOperations'

export const useGoal = (goalId: GoalId): [Goal | null | undefined, boolean] => {
  const [goal, setGoal] = useState<Goal | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    const func = async () => {
      setIsLoading(true)
      const goal = await fetchGoalByIdOperation(goalId)
      setGoal(goal)
      setIsLoading(false)
    }
    func()
  }, [goalId])

  return [goal, isLoading]
}
