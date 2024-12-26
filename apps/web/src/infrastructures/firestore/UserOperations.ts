import { usersCollection } from '@nashitogeru/common'
import type { Uid, CreateUserDto, User } from '@nashitogeru/common'
import type { Unsubscribe } from 'firebase/firestore'
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

export const dateColumns = [
  'createdAt',
  'updatedAt',
] as const satisfies Array<string>

export const subscribeUserByIdOperation = (
  userId: Uid,
  setter: (user: User | null) => void,
): Unsubscribe => {
  const unsubscribe = onSnapshot(
    doc(db, usersCollection, userId),
    (snapshot) => {
      const data = snapshot.data()
      if (!data) {
        return null
      }
      const user = {
        userId: snapshot.id,
        ...convertDate(data, dateColumns),
      } as User
      setter(user)
    },
  )
  return unsubscribe
}

export const createUserOperation = async (
  uid: Uid,
  dto: CreateUserDto,
): Promise<void> => {
  await setDoc(doc(db, usersCollection, uid), dto)
}

export const isExistsUserOperation = async (uid: Uid): Promise<boolean> => {
  const snapshot = await getDoc(doc(db, usersCollection, uid))
  return snapshot.exists()
}
