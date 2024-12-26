import type { Goal } from '@nashitogeru/common'
import { useEffect, useState } from 'react'

import { subscribeGoalsByUserIdOperation } from '~/infrastructures/firestore/GoalOperations'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const useGoals = (): [Array<Goal>, boolean] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [goals, setGoals] = useState<Array<Goal>>([])
  const { uid } = useFirebaseAuthContext()

  useEffect(() => {
    if (!uid) {
      return
    }
    const unsubscribe = subscribeGoalsByUserIdOperation(
      uid,
      setGoals,
      setIsLoading,
    )
    return () => unsubscribe()
  }, [uid])

  return [goals, isLoading]
}
