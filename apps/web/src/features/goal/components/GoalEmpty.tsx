import { IoRocketOutline } from 'react-icons/io5'

import { BasicButton } from '~/components/Buttons/BasicButton'
import { EmptyState } from '~/components/Displays/EmptyState'

type Props = {
  onAdd: () => void
}

export const GoalEmpty = ({ onAdd }: Props): React.ReactNode => {
  return (
    <EmptyState
      icon={<IoRocketOutline size={64} color="#323232" />}
      title="成し遂げたいことを登録してね！"
      description="成し遂げたいことを追加するとここに表示されます"
      action={<BasicButton onClick={onAdd}>成し遂げたいことを追加</BasicButton>}
    />
  )
}
