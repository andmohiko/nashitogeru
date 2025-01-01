import type { Goal, Progress } from '@nashitogeru/common'

import { BaseBottomSheet } from '~/components/Modals/BaseBottomSheet'
import { ProgressForm } from '~/features/progress/components/ProgressForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  goal: Goal
  progress?: Progress
  currentProgressRate: number
}

export const EditProgressModal = ({
  isOpen,
  onClose,
  goal,
  progress,
  currentProgressRate,
}: Props): React.ReactNode => {
  return (
    <BaseBottomSheet
      title={progress ? '成し遂げ度合いを編集' : '成し遂げ度合いを追加'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProgressForm
        goal={goal}
        onClose={onClose}
        defaultValue={progress}
        currentProgressRate={currentProgressRate}
      />
    </BaseBottomSheet>
  )
}
