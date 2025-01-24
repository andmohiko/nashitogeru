import { useDisclosure, useToggle } from '@mantine/hooks'
import type { Goal } from '@nashitogeru/common'
import { useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { Switch } from '@mantine/core'

import { FlexBox } from '~/components/Base/FlexBox'
import { GoalCard } from '~/features/goal/components/GoalCard'
import { GoalEmpty } from '~/features/goal/components/GoalEmpty'
import { EditGoalModal } from '~/features/goal/components/EditGoalModal'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { BaseText } from '~/components/Typography/BaseText'

type Props = {
  goals: Array<Goal>
}

export const GoalsList = ({ goals }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const [selectedGoal, setSelectedGoal] = useState<Goal | undefined>(undefined)
  const [isSecret, toggle] = useToggle([false, true])

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
          <FlexBox direction="row" justify="space-between" align="center">
            <BasicButton
              onClick={onAddGoal}
              leftSection={<IoMdAddCircleOutline size={18} />}
            >
              成し遂げを追加
            </BasicButton>
            <FlexBox direction="row" justify="flex-end" align="center" gap={8}>
              <BaseText size="md" weight="bold">
                秘密モード
              </BaseText>
              <Switch onChange={() => toggle()} />
            </FlexBox>
          </FlexBox>
          {goals.map((goal) => (
            <GoalCard
              key={goal.goalId}
              goal={goal}
              isSecret={isSecret}
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
