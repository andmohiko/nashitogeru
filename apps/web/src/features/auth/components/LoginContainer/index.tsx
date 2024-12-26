import { FlexBox } from '~/components/Base/FlexBox'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { TitleText } from '~/components/Typography/TitleText'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

export const LoginContainer = (): React.ReactNode => {
  const { login } = useFirebaseAuthContext()
  return (
    <DefaultLayout isShowFooter>
      <FlexBox gap={64} justify="flex-start" pt={120}>
        <TitleText>ログイン</TitleText>
        <FlexBox gap={32} height="initial">
          <BasicButton onClick={login}>Googleで新規登録</BasicButton>
          <BasicButton onClick={login} importance="secondary">
            Googleでログイン
          </BasicButton>
        </FlexBox>
      </FlexBox>
    </DefaultLayout>
  )
}
