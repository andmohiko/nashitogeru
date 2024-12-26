import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'
import { GoalsList } from '~/features/goal/components/GoalsList'

export const GoalContainer = (): React.ReactNode => {
  const { goals, isLoading } = useGoalContext()
  return (
    <DefaultLayout isShowFooter>
      {isLoading ? (
        <FlexBox height="initial">
          <LoadingAnimation />
        </FlexBox>
      ) : (
        <FlexBox height="initial">
          <GoalsList goals={goals} />
        </FlexBox>
      )}
    </DefaultLayout>
  )
}
