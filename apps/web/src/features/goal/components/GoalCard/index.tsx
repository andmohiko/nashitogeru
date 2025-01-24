import { Progress as ProgressBar } from '@mantine/core'
import { RiEditCircleLine } from 'react-icons/ri'
import { canEditGoal, type Goal } from '@nashitogeru/common'
import { CiLock } from 'react-icons/ci'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'
import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  goal: Goal
  isSecret: boolean
  onClick?: () => void
}

export const GoalCard = ({
  goal,
  isSecret,
  onClick,
}: Props): React.ReactNode => {
  const today = new Date()
  // 毎年12/28~1/3の間は編集可能。もしくはcreatedAtが3日以内の場合も編集可能
  const canEdit = canEditGoal(goal, today)
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={canEdit ? onClick : undefined}
      onKeyDown={canEdit ? onClick : undefined}
    >
      <div className={styles.title}>
        {isSecret ? (
          <BaseText size="lg" weight="bold">
            非公開
          </BaseText>
        ) : (
          <BaseText size="lg" weight="bold">
            {goal.target}
          </BaseText>
        )}
        <IconButton
          icon={canEdit ? <RiEditCircleLine size={20} /> : <CiLock size={20} />}
          importance="tertiary"
        />
      </div>
      {goal.progressRate && (
        <FlexBox
          direction="row"
          justify="flex-start"
          align="center"
          gap={8}
          pr={8}
        >
          <ProgressBar value={goal.progressRate} color="blue" w="100%" />
          <BaseText size="sm" color="gray">
            {goal.progressRate}%
          </BaseText>
        </FlexBox>
      )}
    </div>
  )
}
