import { RiEditCircleLine } from 'react-icons/ri'
import type { Progress } from '@nashitogeru/common'

import styles from './style.module.css'

import { BaseText } from '~/components/Typography/BaseText'
import { IconButton } from '~/components/Buttons/IconButton'

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
      <BaseText>{progress.note}</BaseText>
      <IconButton icon={<RiEditCircleLine size={20} />} importance="tertiary" />
    </div>
  )
}
