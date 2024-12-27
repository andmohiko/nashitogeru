import type { User } from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'

import { LoadingCover } from '~/components/Base/Loading'
import { useToast } from '~/hooks/useToast'
import {
  createUserOperation,
  isExistsUserOperation,
} from '~/infrastructures/firestore/UserOperations'
import { auth, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

const nonAuthPaths = ['/login']

const FirebaseAuthContext = createContext<{
  currentUser: User | null | undefined
  uid: string | null | undefined
  login: () => void
  logout: () => Promise<void>
  isAuthPath: boolean
}>({
  currentUser: undefined,
  uid: undefined,
  login: async () => {},
  logout: async () => {},
  isAuthPath: false,
})

const FirebaseAuthProvider = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined,
  )
  const [uid, setUid] = useState<string | null | undefined>(undefined)
  const { pathname, push } = useRouter()
  const { showErrorToast } = useToast()

  const isAuthPath = useMemo(() => !nonAuthPaths.includes(pathname), [pathname])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // ログイン不要なページではなにもしない
      if (!isAuthPath) {
        if (user) {
          setCurrentUser(user)
          setUid(user.uid)
        } else {
          setCurrentUser(null)
          setUid(null)
        }
        return
      }

      if (!user) {
        push('/login')
        return
      }

      setCurrentUser(user)
      setUid(user.uid)
    })
    return () => unsubscribe()
  }, [isAuthPath, pathname, push])

  const login = useCallback(async () => {
    const googleProvider = new GoogleAuthProvider()
    signInWithPopup(auth, googleProvider)
      .then(async (val) => {
        const userData = val.user
        const uid = userData.uid
        const isRegistered = await isExistsUserOperation(uid)

        if (!isRegistered) {
          const email = userData.email!
          const username = email.split('@')[0]
          await createUserOperation(uid, {
            createdAt: serverTimestamp,
            displayName: userData.displayName ?? username,
            email,
            profileImagePath: userData.photoURL ?? '',
            updatedAt: serverTimestamp,
            username,
          })
        }

        push('/')
      })
      .catch((error) => {
        console.error('error with google login', error)
        showErrorToast('ログインに失敗しました', errorMessage(error))
      })
  }, [push, showErrorToast])

  const logout = useCallback(async () => {
    await signOut(auth)
  }, [])

  return (
    <FirebaseAuthContext.Provider
      value={{ currentUser, uid, login, logout, isAuthPath }}
    >
      {currentUser === undefined ? <LoadingCover /> : null}
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
