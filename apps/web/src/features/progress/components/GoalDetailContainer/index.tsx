import { useRouter } from 'next/router'
import { useDisclosure } from '@mantine/hooks'

import { EditProgressModal } from '~/features/progress/components/EditProgressModal'
import { ProgressEmpty } from '~/features/progress/components/ProgressEmpty'
import { GoalHeader } from '~/features/progress/components/GoalHeader'
import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useGoalContext } from '~/providers/GoalProvider'
import { LoadingAnimation } from '~/components/Base/Loading'

export const GoalDetailContainer = (): React.ReactNode => {
  const { query } = useRouter()
  const [isOpen, handlers] = useDisclosure()
  const goalId = query.id as string
  const { isLoading, findGoalById } = useGoalContext()
  const goal = findGoalById(goalId)
  return (
    <DefaultLayout isShowFooter>
      {isLoading || !goal ? (
        <FlexBox height="initial">
          <LoadingAnimation />
        </FlexBox>
      ) : (
        <FlexBox height="initial">
          <GoalHeader goal={goal} />
          <ProgressEmpty onAdd={handlers.open} />
        </FlexBox>
      )}

      <EditProgressModal isOpen={isOpen} onClose={handlers.close} goal={goal} />
    </DefaultLayout>
  )
}
