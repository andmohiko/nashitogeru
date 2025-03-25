import type { User, UserId } from '@nashitogeru/common'
import { useEffect, useState } from 'react'

import { fetchUserByIdOperation } from '~/infrastructures/firestore/UserOperations'

export const usePublicUser = (
  userId: UserId,
): [User | null | undefined, boolean] => {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const func = async () => {
      setIsLoading(true)
      const user = await fetchUserByIdOperation(userId)
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    }
    func()
  }, [userId])

  return [user, isLoading]
}
