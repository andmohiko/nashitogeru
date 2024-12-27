import { TbProgressBolt } from 'react-icons/tb'

import { BasicButton } from '~/components/Buttons/BasicButton'
import { EmptyState } from '~/components/Displays/EmptyState'

type Props = {
  onAdd: () => void
}

export const ProgressEmpty = ({ onAdd }: Props): React.ReactNode => {
  return (
    <EmptyState
      icon={<TbProgressBolt size={64} color="#323232" />}
      title="成し遂げ度合いを記録しよう！"
      description="成し遂げ度合いを記入するとここに表示されます"
      action={<BasicButton onClick={onAdd}>成し遂げ度合いを追加</BasicButton>}
    />
  )
}
