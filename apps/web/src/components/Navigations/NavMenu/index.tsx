import { AppShell } from '@mantine/core'
import { useRouter } from 'next/router'
import type { Goal } from '@nashitogeru/common'
import { IoMdAddCircleOutline } from 'react-icons/io'

import styles from './style.module.css'

import { MenuItem, type MenuItemProps } from '~/components/Navigations/MenuItem'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { BaseText } from '~/components/Typography/BaseText'

type Props = {
  goals: Array<Goal>
  onClose?: () => void
}

export const NavMenu = ({ goals, onClose }: Props): React.ReactElement => {
  const { pathname, query } = useRouter()
  const { currentUser } = useFirebaseAuthContext()

  const menuItems: Array<MenuItemProps> = goals.map((goal) => ({
    href: `/goals/${goal.goalId}`,
    label: goal.target,
    isCurrent: query.id === goal.goalId,
  }))
  menuItems.unshift({
    href: '/',
    label: '成し遂げを追加',
    icon: <IoMdAddCircleOutline size={18} />,
    isCurrent: pathname === '/',
  })

  return (
    <AppShell.Navbar p="sm" className={styles.navBar}>
      <div className={styles.menuItems}>
        {currentUser ? (
          menuItems.map((item) => (
            <MenuItem key={item.href} {...item} onClick={onClose} />
          ))
        ) : (
          <BaseText>ログインしてね</BaseText>
        )}
      </div>
    </AppShell.Navbar>
  )
}
