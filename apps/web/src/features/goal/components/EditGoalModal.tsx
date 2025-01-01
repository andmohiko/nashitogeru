import type { Goal } from '@nashitogeru/common'

import { BaseBottomSheet } from '~/components/Modals/BaseBottomSheet'
import { GoalForm } from '~/features/goal/components/GoalForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  goal?: Goal
  previousGoal?: Goal
}

export const EditGoalModal = ({
  isOpen,
  onClose,
  goal,
}: Props): React.ReactElement => {
  return (
    <BaseBottomSheet
      title={goal ? '成し遂げを編集' : '成し遂げを追加'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <GoalForm defaultValue={goal} onClose={onClose} />
    </BaseBottomSheet>
  )
}
