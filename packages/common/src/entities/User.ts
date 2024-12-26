import type { FieldValue } from 'firebase/firestore'

import type { Uid } from './Auth'

export type UserId = Uid

export const usersCollection = 'users' as const

export type User = {
  userId: UserId
  createdAt: Date
  displayName: string
  email: string
  profileImagePath: string
  updatedAt: Date
  username: string
}

export type CreateUserDto = Omit<User, 'userId' | 'createdAt' | 'updatedAt'> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdateUserDto = {
  displayName?: User['displayName']
  profileImagePath?: User['profileImagePath']
  updatedAt: FieldValue
  username?: User['username']
}
