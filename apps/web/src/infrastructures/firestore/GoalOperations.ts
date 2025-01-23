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
  getDoc,
  onSnapshot,
  orderBy,
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

export const fetchGoalByIdOperation = async (
  goalId: Goal['goalId'],
): Promise<Goal | null> => {
  const docSnap = await getDoc(doc(db, goalsCollection, goalId))
  if (!docSnap.exists()) {
    return null
  }

  const data = docSnap.data()

  if (!data) {
    return null
  }

  return {
    goalId: docSnap.id,
    ...convertDate(data, dateColumns),
  } as Goal
}

export const subscribeGoalsByUserIdOperation = (
  userId: User['userId'],
  setter: (goals: Array<Goal>) => void,
  setIsLoading: (isLoading: boolean) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, goalsCollection),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc'),
    ),
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
