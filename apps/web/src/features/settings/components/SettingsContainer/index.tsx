import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const SettingsContainer = (): React.ReactNode => {
  const { logout } = useFirebaseAuthContext()
  return (
    <DefaultLayout isShowFooter>
      <FlexBox gap={64} justify="space-between" pt={120}>
        <BasicButton onClick={logout}>ログアウト</BasicButton>
      </FlexBox>
    </DefaultLayout>
  )
}
