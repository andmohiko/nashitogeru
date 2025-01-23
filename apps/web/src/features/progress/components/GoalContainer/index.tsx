import type { GoalId } from '@nashitogeru/common'
import { useMemo } from 'react'

import { MyProgressContainer } from '~/features/progress/components/MyProgressContainer'
import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'
import { useGoal } from '~/features/progress/hooks/useGoal'

type Props = {
  goalId: GoalId
}

export const GoalContainer = ({ goalId }: Props): React.ReactNode => {
  const { isLoading: isLoadingGoals, findMyGoalById } = useGoalContext()
  const goal = findMyGoalById(goalId)
  const [publicGoal, isLoadingPublicGoal] = useGoal(goalId)
  const isLoadingGoal = useMemo(
    () => isLoadingGoals || isLoadingPublicGoal || publicGoal === undefined,
    [isLoadingGoals, isLoadingPublicGoal, publicGoal],
  )

  return (
    <DefaultLayout>
      {isLoadingGoal ? (
        <FlexBox height="initial">
          <LoadingAnimation />
        </FlexBox>
      ) : (
        <>
          {/* 自分のゴールの場合: goalがあるとき */}
          {goal && <MyProgressContainer goal={goal} />}
          {/* TODO: 公開済みのゴールの場合: publicGoalがあるとき */}
          {/* TODO: 非公開または存在しないゴールの場合: goalもpublicGoalもnullのとき */}
        </>
      )}
    </DefaultLayout>
  )
}
