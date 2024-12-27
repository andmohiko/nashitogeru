import { useDisclosure } from '@mantine/hooks'
import type { Goal } from '@nashitogeru/common'
import { useState } from 'react'

import { FlexBox } from '~/components/Base/FlexBox'
import { GoalCard } from '~/features/goal/components/GoalCard'
import { GoalEmpty } from '~/features/goal/components/GoalEmpty'
import { EditGoalModal } from '~/features/goal/components/EditGoalModal'
import { BasicButton } from '~/components/Buttons/BasicButton'

type Props = {
  goals: Array<Goal>
}

export const GoalsList = ({ goals }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined)

  const onSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal)
    handlers.open()
  }

  const onAddGoal = () => {
    setSelectedGoal(undefined)
    handlers.open()
  }

  return (
    <>
      {goals.length === 0 ? (
        <GoalEmpty onAdd={onAddGoal} />
      ) : (
        <FlexBox gap={16}>
          <BasicButton onClick={onAddGoal}>成し遂げを追加</BasicButton>
          {goals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              goal={goal}
              onClick={() => onSelectGoal(goal)}
            />
          ))}
        </FlexBox>
      )}

      <EditGoalModal
        goal={selectedGoal}
        isOpen={isOpen}
        onClose={handlers.close}
      />
    </>
  )
}