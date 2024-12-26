import { FlexBox } from '~/components/Base/FlexBox'
import { BaseText } from '~/components/Typography/BaseText'

export const BottomFooter = (): React.ReactNode => {
  return (
    <FlexBox height="initial">
      <BaseText size="xs">Powered by Vampire Meeting</BaseText>
    </FlexBox>
  )
}
