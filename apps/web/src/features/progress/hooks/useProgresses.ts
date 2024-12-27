import type { GoalId, Progress } from '@nashitogeru/common'
import { useEffect, useState } from 'react'

import { subscribeProgressOperation } from '~/infrastructures/firestore/ProgressOperations'

export const useProgresses = (goalId: GoalId): [Array<Progress>, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progresses, setProgresses] = useState<Array<Progress>>([])

  useEffect(() => {
    const unsubscribe = subscribeProgressOperation(
      goalId,
      setProgresses,
      setIsLoading,
    )
    return () => unsubscribe()
  }, [goalId])

  return [progresses, isLoading]
}
