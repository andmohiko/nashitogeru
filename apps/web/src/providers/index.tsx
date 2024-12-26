import { FirebaseAuthProvider } from '~/providers/FirebaseAuthProvider'
import { LoadingProvider } from '~/providers/LoadingProvider'
import { MantineProvider } from '~/providers/MantineProvider'
import { GoalProvider } from '~/providers/GoalProvider'

type Props = {
  children: React.ReactNode
}

export const Providers = ({ children }: Props): React.ReactNode => {
  return (
    <MantineProvider>
      <LoadingProvider>
        <FirebaseAuthProvider>
          <GoalProvider>{children}</GoalProvider>
        </FirebaseAuthProvider>
      </LoadingProvider>
    </MantineProvider>
  )
}
