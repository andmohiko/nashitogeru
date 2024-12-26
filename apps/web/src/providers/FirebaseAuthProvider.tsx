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

import { useToast } from '~/hooks/useToast'
import {
  createUserOperation,
  isExistsUserOperation,
} from '~/infrastructures/firestore/UserOperations'
import { auth, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

const nonAuthPaths = ['/login']

const FirebaseAuthContext = createContext<{
  currentUser: User | null
  uid: string | null
  login: () => void
  logout: () => Promise<void>
  isAuthPath: boolean
}>({
  currentUser: null,
  uid: null,
  login: async () => {},
  logout: async () => {},
  isAuthPath: false,
})

const FirebaseAuthProvider = ({
  children,
}: {
  children: ReactNode
}): ReactNode => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [uid, setUid] = useState<string | null>(null)
  const { pathname, push } = useRouter()
  const { showErrorToast } = useToast()

  const isAuthPath = useMemo(() => !nonAuthPaths.includes(pathname), [pathname])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(null)
      setUid(null)

      // ログイン不要なページではなにもしない
      if (!isAuthPath) {
        if (user) {
          setCurrentUser(user)
          setUid(user.uid)
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
      {children}
    </FirebaseAuthContext.Provider>
  )
}

export { FirebaseAuthContext, FirebaseAuthProvider }

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext)
