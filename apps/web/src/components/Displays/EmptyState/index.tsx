import styles from './style.module.css'

import { TitleText } from '~/components/Typography/TitleText'
import { BaseText } from '~/components/Typography/BaseText'

type Props = {
  icon: React.ReactNode
  title: string
  description: string
  action: React.ReactNode
}

export const EmptyState = ({ icon, title, description, action }: Props) => {
  return (
    <div className={styles.emptyState}>
      {icon}
      <div className={styles.texts}>
        <TitleText level={3}>{title}</TitleText>
        <BaseText color="gray">{description}</BaseText>
      </div>
      <div className={styles.action}>{action}</div>
    </div>
  )
}
