import { RiEditCircleLine } from 'react-icons/ri'
import type { Goal } from '@nashitogeru/common'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'

type Props = {
  goal: Goal
  onClick?: () => void
}

export const GoalCard = ({ goal, onClick }: Props): React.ReactNode => {
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <BaseText size="lg" weight="bold">
        {goal.target}
      </BaseText>
      <IconButton icon={<RiEditCircleLine size={20} />} importance="tertiary" />
    </div>
  )
}
