import type { Goal } from '@nashitogeru/common'

import styles from './style.module.css'

import { GoalHeader } from '~/features/progress/components/GoalHeader'
import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingAnimation } from '~/components/Base/Loading'
import { useProgresses } from '~/features/progress/hooks/useProgresses'
import { ProgressesList } from '~/features/progress/components/ProgressesList'
import { usePublicUser } from '~/features/progress/hooks/usePublicUser'
import { GoalUserHeader } from '~/features/progress/components/GoalUserHeader'

type Props = {
  goal: Goal
}

export const PublicProgressContainer = ({ goal }: Props): React.ReactNode => {
  const [progresses, isLoadingProgresses] = useProgresses(goal.goalId)
  const [user] = usePublicUser(goal.userId)

  return (
    <FlexBox height="initial" gap={24}>
      <div className={styles.container}>
        {user && <GoalUserHeader user={user} />}
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
