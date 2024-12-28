import { IoMdClose } from 'react-icons/io'
import { ActionIcon } from '@mantine/core'

import styles from './style.module.css'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export const FrameModal = ({
  children,
  isOpen,
  onClose,
}: Props): React.ReactNode => {
  return isOpen ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={styles.background} onClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.close}>
          <ActionIcon onClick={onClose} color="#323232">
            <IoMdClose size={20} />
          </ActionIcon>
        </div>
        {children}
      </div>
    </div>
  ) : null
}
