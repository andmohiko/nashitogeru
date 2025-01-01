import type { Progress } from '@nashitogeru/common'
import { Timeline } from '@mantine/core'
import dayjs from 'dayjs'

import { ProgressCard } from '~/features/progress/components/ProgressCard'
import { ProgressEmpty } from '~/features/progress/components/ProgressEmpty'
import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  progresses: Array<Progress>
  onSelectProgress: (progress: Progress) => void
}

export const ProgressesList = ({
  progresses,
  onSelectProgress,
}: Props): React.ReactNode => {
  return progresses.length === 0 ? (
    <ProgressEmpty />
  ) : (
    <FlexBox gap={16} mb={140}>
      <Timeline lineWidth={2} w="100%">
        {progresses.map((progress) => (
          <Timeline.Item
            key={progress.progressId}
            title={dayjs(progress.date).format('YYYY/MM/DD')}
          >
            <ProgressCard
              progress={progress}
              onClick={() => onSelectProgress(progress)}
            />
          </Timeline.Item>
        ))}
      </Timeline>
    </FlexBox>
  )
}
