import { useDisclosure } from '@mantine/hooks'
import type { Goal, Progress } from '@nashitogeru/common'
import { useState } from 'react'
import { Timeline } from '@mantine/core'
import dayjs from 'dayjs'

import { ProgressCard } from '~/features/progress/components/ProgressCard'
import { ProgressEmpty } from '~/features/progress/components/ProgressEmpty'
import { EditProgressModal } from '~/features/progress/components/EditProgressModal'
import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  goal: Goal
  progresses: Array<Progress>
}

export const ProgressesList = ({
  goal,
  progresses,
}: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  const [selectedProgress, setSelectedProgress] = useState<
    Progress | undefined
  >(undefined)

  const onSelectProgress = (progress: Progress) => {
    setSelectedProgress(progress)
    handlers.open()
  }

  const onAddProgress = () => {
    setSelectedProgress(undefined)
    handlers.open()
  }

  return (
    <>
      {progresses.length === 0 ? (
        <ProgressEmpty onAdd={onAddProgress} />
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
      )}

      <EditProgressModal
        isOpen={isOpen}
        onClose={handlers.close}
        goal={goal}
        progress={selectedProgress}
      />
    </>
  )
}
