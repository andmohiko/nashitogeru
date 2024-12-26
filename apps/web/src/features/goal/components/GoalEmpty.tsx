import { useDisclosure } from '@mantine/hooks'
import { IoRocketOutline } from 'react-icons/io5'

import { BasicButton } from '~/components/Buttons/BasicButton'
import { EmptyState } from '~/components/Displays/EmptyState'
import { EditGoalModal } from '~/features/goal/components/EditGoalModal'

export const GoalEmpty = (): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()

  return (
    <>
      <EmptyState
        icon={<IoRocketOutline size={64} color="#323232" />}
        title="成し遂げたいことを登録してね！"
        description="成し遂げたいことを追加するとここに表示されます"
        action={
          <BasicButton onClick={handlers.open}>
            成し遂げたいことを追加
          </BasicButton>
        }
      />

      <EditGoalModal isOpen={isOpen} onClose={handlers.close} />
    </>
  )
}
