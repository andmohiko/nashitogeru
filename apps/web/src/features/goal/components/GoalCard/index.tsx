import { RiEditCircleLine } from 'react-icons/ri'
import type { Goal } from '@nashitogeru/common'
import { CiLock } from 'react-icons/ci'
import dayjs from 'dayjs'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'

type Props = {
  goal: Goal
  onClick?: () => void
}

export const GoalCard = ({ goal, onClick }: Props): React.ReactNode => {
  const today = new Date()
  // 12/28~1/3の間は編集可能。もしくはcreatedAtが3日以内の場合も編集可能
  const canEdit =
    (dayjs(today).isAfter(dayjs('2021-12-27')) &&
      dayjs(today).isBefore(dayjs('2022-01-03'))) ||
    dayjs(today).isBefore(dayjs(goal.createdAt).add(3, 'day'))
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={canEdit ? onClick : undefined}
      onKeyDown={canEdit ? onClick : undefined}
    >
      <BaseText size="lg" weight="bold">
        {goal.target}
      </BaseText>
      <IconButton
        icon={canEdit ? <RiEditCircleLine size={20} /> : <CiLock size={20} />}
        importance="tertiary"
      />
    </div>
  )
}
