import { goalsCollection } from '@nashitogeru/common'
import type {
  CreateGoalDto,
  Goal,
  UpdateGoalDto,
  User,
} from '@nashitogeru/common'
import type { Unsubscribe } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const dateColumns = [
  'createdAt',
  'updatedAt',
] as const satisfies Array<string>

export const subscribeGoalsByUserIdOperation = (
  userId: User['userId'],
  setter: (goals: Array<Goal>) => void,
  setIsLoading: (isLoading: boolean) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    query(collection(db, goalsCollection), where('userId', '==', userId)),
    (snapshot) => {
      setIsLoading(true)
      const goals: Array<Goal> = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        goals.push({
          goalId: doc.id,
          ...convertDate(data, dateColumns),
        } as Goal)
      })
      setter(goals)
      setIsLoading(false)
    },
  )
  return unsubscribe
}

export const createGoalOperation = async (
  dto: CreateGoalDto,
): Promise<void> => {
  await addDoc(collection(db, goalsCollection), dto)
}

export const updateGoalOperation = async (
  goalId: string,
  dto: UpdateGoalDto,
): Promise<void> => {
  await updateDoc(doc(db, goalsCollection, goalId), dto)
}

export const deleteGoalOperation = async (goalId: string): Promise<void> => {
  await deleteDoc(doc(db, goalsCollection, goalId))
}
