import { useRouter } from 'next/router'

import { GoalHeader } from '~/features/goal/components/GoalHeader'
import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'

export const GoalDetailContainer = (): React.ReactNode => {
  const { query } = useRouter()
  const goalId = query.id as string
  const { isLoading, findGoalById } = useGoalContext()
  const goal = findGoalById(goalId)
  return (
    <DefaultLayout isShowFooter>
      {isLoading || !goal ? (
        <FlexBox height="initial">
          <LoadingAnimation />
        </FlexBox>
      ) : (
        <FlexBox height="initial">
          <GoalHeader goal={goal} />
        </FlexBox>
      )}
    </DefaultLayout>
  )
}
