import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { LoadingContentOverlay } from '~/components/Base/Loading'
import { ProgressContainer } from '~/features/progress/components/ProgressContainer'

const IndexPage: NextPage = () => {
  const { query } = useRouter()
  const goalId = query.id
  return typeof goalId === 'string' ? (
    <ProgressContainer goalId={goalId} />
  ) : (
    <LoadingContentOverlay />
  )
}

export default IndexPage
