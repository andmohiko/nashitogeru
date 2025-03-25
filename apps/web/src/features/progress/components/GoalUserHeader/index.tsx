import type { User } from '@nashitogeru/common'
import { Image } from '@mantine/core'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'

type Props = {
  user: User
}

export const GoalUserHeader = ({ user }: Props): React.ReactNode => {
  return (
    <div className={styles.card}>
      {user.profileImagePath && (
        <Image src={user.profileImagePath} className={styles.icon} alt="" />
      )}
      <BaseText size="lg" weight="bold">
        {user.displayName}さんの成し遂げ
      </BaseText>
    </div>
  )
}
