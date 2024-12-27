import { useRouter } from 'next/router'

import { GoalHeader } from '../GoalHeader'

import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'
import { GoalsList } from '~/features/goal/components/GoalsList'

export const GoalDetailContainer = (): React.ReactNode => {
  const { query } = useRouter()
  const goalId = query.id as string
  const { goals, isLoading, findGoalById } = useGoalContext()
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
