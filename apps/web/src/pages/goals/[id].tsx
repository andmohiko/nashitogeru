import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { LoadingContentOverlay } from '~/components/Base/Loading'
import { ProgressLayout } from '~/features/progress/components/GoalContainer'

const ProgressPage: NextPage = () => {
  const { query } = useRouter()
  const goalId = query.id
  return typeof goalId === 'string' ? (
    <ProgressLayout goalId={goalId} />
  ) : (
    <LoadingContentOverlay />
  )
}

export default ProgressPage
