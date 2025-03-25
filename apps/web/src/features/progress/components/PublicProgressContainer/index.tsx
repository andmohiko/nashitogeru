import type { Goal } from '@nashitogeru/common'

import styles from './style.module.css'

import { GoalHeader } from '~/features/progress/components/GoalHeader'
import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingAnimation } from '~/components/Base/Loading'
import { useProgresses } from '~/features/progress/hooks/useProgresses'
import { ProgressesList } from '~/features/progress/components/ProgressesList'

type Props = {
  goal: Goal
}

export const PublicProgressContainer = ({ goal }: Props): React.ReactNode => {
  const [progresses, isLoadingProgresses] = useProgresses(goal.goalId)

  return (
    <FlexBox height="initial" gap={24}>
      <div className={styles.container}>
        <GoalHeader goal={goal} />
        {isLoadingProgresses ? (
          <FlexBox height="initial">
            <LoadingAnimation />
          </FlexBox>
        ) : (
          <ProgressesList progresses={progresses} />
        )}
      </div>
    </FlexBox>
  )
}
