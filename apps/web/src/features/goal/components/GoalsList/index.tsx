import type { Goal } from '@nashitogeru/common'

import { FlexBox } from '~/components/Base/FlexBox'
import { GoalCard } from '~/features/goal/components/GoalCard'
import { GoalEmpty } from '~/features/goal/components/GoalEmpty'

type Props = {
  goals: Array<Goal>
}

export const GoalsList = ({ goals }: Props): React.ReactNode => {
  return goals.length === 0 ? (
    <GoalEmpty />
  ) : (
    <FlexBox gap={16}>
      {goals.map((goal) => (
        <GoalCard key={goal.goalId} goal={goal} />
      ))}
    </FlexBox>
  )
}
