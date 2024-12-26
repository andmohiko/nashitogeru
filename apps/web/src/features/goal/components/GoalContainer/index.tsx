import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { GoalForm } from '~/features/goal/components/GoalForm'

export const GoalContainer = (): React.ReactNode => {
  return (
    <DefaultLayout>
      <FlexBox mb={80}>
        <GoalForm />
      </FlexBox>
    </DefaultLayout>
  )
}
