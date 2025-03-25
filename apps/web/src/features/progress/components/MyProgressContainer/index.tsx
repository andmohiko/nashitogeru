import { useDisclosure } from '@mantine/hooks'
import type { Goal, Progress } from '@nashitogeru/common'
import { useMemo, useState } from 'react'
import { Switch } from '@mantine/core'

import styles from './style.module.css'

import { EditProgressModal } from '~/features/progress/components/EditProgressModal'
import { AddProgressButton } from '~/features/progress/components/AddProgressButton'
import { GoalHeader } from '~/features/progress/components/GoalHeader'
import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingAnimation } from '~/components/Base/Loading'
import { useProgresses } from '~/features/progress/hooks/useProgresses'
import { ProgressesList } from '~/features/progress/components/ProgressesList'
import { BaseText } from '~/components/Typography/BaseText'
import { useTogglePublishGoal } from '~/features/progress/hooks/useMutateGoal'

type Props = {
  goal: Goal
}

export const MyProgressContainer = ({ goal }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const { publishGoal, unpublishGoal } = useTogglePublishGoal()
  const [progresses, isLoadingProgresses] = useProgresses(goal.goalId)
  const [selectedProgress, setSelectedProgress] = useState<
    Progress | undefined
  >(undefined)

  const onSelectProgress = (progress: Progress) => {
    setSelectedProgress(progress)
    handlers.open()
  }
  const currentProgressRate = useMemo(() => {
    const latestProgress = progresses[0]
    return latestProgress?.progressRate ?? 0
  }, [progresses])

  return (
    <>
      <FlexBox height="initial" gap={24}>
        <div className={styles.container}>
          <FlexBox direction="row" justify="flex-end" align="center" gap={8}>
            <BaseText size="md" weight="bold">
              公開する
            </BaseText>
            <Switch
              checked={goal.isPublished}
              onChange={() =>
                goal.isPublished
                  ? unpublishGoal(goal.goalId)
                  : publishGoal(goal.goalId)
              }
            />
          </FlexBox>
          <GoalHeader goal={goal} />
          {isLoadingProgresses ? (
            <FlexBox height="initial">
              <LoadingAnimation />
            </FlexBox>
          ) : (
            <ProgressesList
              progresses={progresses}
              onSelectProgress={onSelectProgress}
            />
          )}
        </div>
      </FlexBox>

      <div className={styles.addButton}>
        <AddProgressButton add={handlers.open} />
      </div>

      <EditProgressModal
        isOpen={isOpen}
        onClose={handlers.close}
        goal={goal}
        progress={selectedProgress}
        currentProgressRate={currentProgressRate}
      />
    </>
  )
}
