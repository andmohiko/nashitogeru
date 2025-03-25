import type { GoalId } from '@nashitogeru/common'
import { useMemo } from 'react'

import { MyProgressContainer } from '~/features/progress/components/MyProgressContainer'
import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'
import { useGoal } from '~/features/progress/hooks/useGoal'
import { PublicProgressContainer } from '~/features/progress/components/PublicProgressContainer'

type Props = {
  goalId: GoalId
}

export const ProgressLayout = ({ goalId }: Props): React.ReactNode => {
  return (
    <DefaultLayout>
      <GoalContainer goalId={goalId} />
    </DefaultLayout>
  )
}

export const GoalContainer = ({ goalId }: Props): React.ReactNode => {
  const { isLoading: isLoadingGoals, findMyGoalById } = useGoalContext()
  const goal = findMyGoalById(goalId)
  const [publicGoal, isLoadingPublicGoal] = useGoal(goalId)
  const isLoadingGoal = useMemo(
    () => isLoadingGoals || isLoadingPublicGoal || publicGoal === undefined,
    [isLoadingGoals, isLoadingPublicGoal, publicGoal],
  )

  if (isLoadingGoal) {
    return (
      <FlexBox height="initial">
        <LoadingAnimation />
      </FlexBox>
    )
  }

  if (goal) {
    return <MyProgressContainer goal={goal} />
  }

  if (publicGoal) {
    return <PublicProgressContainer goal={publicGoal} />
  }

  return <FlexBox height="initial">成し遂げが見つかりません。</FlexBox>
}
