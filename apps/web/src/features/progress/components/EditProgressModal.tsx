import type { Goal } from '@nashitogeru/common'

import { BaseBottomSheet } from '~/components/Modals/BaseBottomSheet'
import { ProgressForm } from '~/features/progress/components/ProgressForm'

type Props = {
  isOpen: boolean
  onClose: () => void
  goal: Goal
}

export const EditProgressModal = ({
  isOpen,
  onClose,
  goal,
}: Props): React.ReactNode => {
  return (
    <BaseBottomSheet
      title={goal ? '成し遂げ度合いを編集' : '成し遂げ度合いを追加'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ProgressForm goal={goal} onClose={onClose} />
    </BaseBottomSheet>
  )
}
