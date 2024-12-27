import type { Goal } from '@nashitogeru/common'
import { IoRocketOutline } from 'react-icons/io5'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'

type Props = {
  goal: Goal
  onClick?: () => void
}

export const GoalHeader = ({ goal, onClick }: Props): React.ReactNode => {
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <IconButton icon={<IoRocketOutline size={20} />} importance="tertiary" />
      <BaseText size="lg" weight="bold">
        {goal.target}
      </BaseText>
    </div>
  )
}
