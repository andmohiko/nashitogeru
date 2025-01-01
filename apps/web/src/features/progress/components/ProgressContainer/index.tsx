import { useDisclosure } from '@mantine/hooks'
import type { GoalId, Progress } from '@nashitogeru/common'
import { useMemo, useState } from 'react'

import styles from './style.module.css'

import { EditProgressModal } from '~/features/progress/components/EditProgressModal'
import { AddProgressButton } from '~/features/progress/components/AddProgressButton'
import { GoalHeader } from '~/features/progress/components/GoalHeader'
import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'
import { useProgresses } from '~/features/progress/hooks/useProgresses'
import { ProgressesList } from '~/features/progress/components/ProgressesList'

type Props = {
  goalId: GoalId
}

export const ProgressContainer = ({ goalId }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const { isLoading: isLoadingGoals, findGoalById } = useGoalContext()
  const goal = findGoalById(goalId)
  const [progresses, isLoadingProgresses] = useProgresses(goalId)
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
    <DefaultLayout>
      {isLoadingGoals || isLoadingProgresses || !goal ? (
        <FlexBox height="initial">
          <LoadingAnimation />
        </FlexBox>
      ) : (
        <FlexBox height="initial" gap={24}>
          <div className={styles.container}>
            <GoalHeader goal={goal} />
            <ProgressesList
              progresses={progresses}
              onSelectProgress={onSelectProgress}
            />
          </div>
        </FlexBox>
      )}

      {goal && (
        <>
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
      )}
    </DefaultLayout>
  )
}
