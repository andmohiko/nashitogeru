import { RiEditCircleLine } from 'react-icons/ri'
import type { Progress } from '@nashitogeru/common'
import { Progress as ProgressBar } from '@mantine/core'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'
import { FlexBox } from '~/components/Base/FlexBox'
import { GridLayout } from '~/components/Base/GridLayout'

type Props = {
  progress: Progress
  onClick?: () => void
}

export const ProgressCard = ({ progress, onClick }: Props): React.ReactNode => {
  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
    >
      <FlexBox justify="flex-start" align="stretch" gap={8} pt={8}>
        <BaseText>{progress.note}</BaseText>
      </FlexBox>
      <GridLayout gridTemplateColumns="1fr 40px">
        <FlexBox direction="row" justify="flex-start" align="center" gap={8}>
          <ProgressBar value={progress.progressRate} color="blue" w="150px" />
          <BaseText size="sm" color="gray">
            {progress.progressRate}%
          </BaseText>
        </FlexBox>
        <IconButton
          icon={<RiEditCircleLine size={20} />}
          importance="tertiary"
        />
      </GridLayout>
    </div>
  )
}
