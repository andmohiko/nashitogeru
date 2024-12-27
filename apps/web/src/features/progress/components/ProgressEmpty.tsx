import { TbProgressBolt } from 'react-icons/tb'

import { EmptyState } from '~/components/Displays/EmptyState'

export const ProgressEmpty = (): React.ReactNode => {
  return (
    <EmptyState
      icon={<TbProgressBolt size={64} color="#323232" />}
      title="成し遂げ度合いを記録しよう！"
      description="成し遂げ度合いを記入するとここに表示されます"
    />
  )
}
