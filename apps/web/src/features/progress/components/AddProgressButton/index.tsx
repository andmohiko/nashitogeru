import { BsPlus } from 'react-icons/bs'

import styles from './style.module.css'

type Props = {
  add: () => void
}

export const AddProgressButton = ({ add }: Props): React.ReactElement => {
  return (
    <button className={styles.addButton} onClick={add}>
      <BsPlus size={64} />
    </button>
  )
}
