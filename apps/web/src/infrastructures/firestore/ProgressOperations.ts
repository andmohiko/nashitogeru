import { goalsCollection, progressesCollection } from '@nashitogeru/common'
import type {
  CreateProgressDto,
  Goal,
  Progress,
  UpdateProgressDto,
} from '@nashitogeru/common'
import type { Unsubscribe } from 'firebase/firestore'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const dateColumns = [
  'createdAt',
  'date',
  'updatedAt',
] as const satisfies Array<string>

export const subscribeProgressOperation = (
  goalId: Goal['goalId'],
  setter: (progresses: Array<Progress>) => void,
  setIdLoading: (isLoading: boolean) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    query(
      collection(db, goalsCollection, goalId, progressesCollection),
      orderBy('date', 'desc'),
    ),
    (snapshot) => {
      setIdLoading(true)
      const progresses: Array<Progress> = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        progresses.push({
          progressId: doc.id,
          ...convertDate(data, dateColumns),
        } as Progress)
      })
      setter(progresses)
      setIdLoading(false)
    },
  )
  return unsubscribe
}

export const createProgressOperation = async (
  goalId: Goal['goalId'],
  dto: CreateProgressDto,
): Promise<void> => {
  await addDoc(
    collection(db, goalsCollection, goalId, progressesCollection),
    dto,
  )
}

export const updateProgressOperation = async (
  goalId: Goal['goalId'],
  progressId: Progress['progressId'],
  dto: UpdateProgressDto,
): Promise<void> => {
  await updateDoc(
    doc(db, goalsCollection, goalId, progressesCollection, progressId),
    dto,
  )
}

export const deleteProgressOperation = async (
  goalId: Goal['goalId'],
  progressId: Progress['progressId'],
): Promise<void> => {
  await deleteDoc(
    doc(db, goalsCollection, goalId, progressesCollection, progressId),
  )
}
