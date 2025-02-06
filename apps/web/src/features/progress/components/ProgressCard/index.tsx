import { RiEditCircleLine } from 'react-icons/ri'
import type { Progress } from '@nashitogeru/common'
import { Progress as ProgressBar } from '@mantine/core'
import Image from 'next/image'
import { useDisclosure } from '@mantine/hooks'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'
import { FlexBox } from '~/components/Base/FlexBox'
import { GridLayout } from '~/components/Base/GridLayout'
import { FrameModal } from '~/components/Modals/FrameModal'

type Props = {
  progress: Progress
  onClick?: () => void
}

export const ProgressCard = ({ progress, onClick }: Props): React.ReactNode => {
  const [isOpen, handlers] = useDisclosure()
  return (
    <div className={styles.card}>
      <FlexBox justify="flex-start" align="stretch" gap={8} pt={8}>
        <BaseText>{progress.note}</BaseText>
      </FlexBox>
      {progress.imagePaths.length > 0 && (
        <FlexBox justify="flex-start" align="stretch" gap={8} pt={8}>
          <Image
            src={progress.imagePaths[0]}
            width={633}
            height={200}
            alt=""
            className={styles.image}
            onClick={handlers.open}
          />
        </FlexBox>
      )}
      <GridLayout gridTemplateColumns="1fr 40px">
        <FlexBox direction="row" justify="flex-start" align="center" gap={8}>
          <ProgressBar value={progress.progressRate} color="blue" w="150px" />
          <BaseText size="sm" color="gray">
            {progress.progressRate}%
          </BaseText>
        </FlexBox>
        <IconButton
          icon={<RiEditCircleLine size={20} />}
          onClick={onClick}
          importance="tertiary"
        />
      </GridLayout>

      <FrameModal isOpen={isOpen} onClose={handlers.close}>
        <Image
          src={progress.imagePaths[0]}
          width={500}
          height={500}
          alt=""
          className={styles.expandedImage}
        />
      </FrameModal>
    </div>
  )
}
