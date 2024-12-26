import { AppShell } from '@mantine/core'
import { useRouter } from 'next/router'
import type { Goal } from '@nashitogeru/common'

import styles from './style.module.css'

import { MenuItem, type MenuItemProps } from '~/components/Navigations/MenuItem'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { BaseText } from '~/components/Typography/BaseText'

type Props = {
  goals: Array<Goal>
}

export const NavMenu = ({ goals }: Props): React.ReactElement => {
  const { pathname } = useRouter()
  const { isAuthPath } = useFirebaseAuthContext()

  const menuItems: Array<MenuItemProps> = goals.map((goal) => ({
    href: `/goals/${goal.goalId}`,
    label: goal.target,
    isCurrent: pathname.includes(goal.goalId),
  }))

  return (
    <AppShell.Navbar p="sm" className={styles.navBar}>
      <div className={styles.menuItems}>
        {isAuthPath ? (
          menuItems.map((item) => (
            <MenuItem
              key={item.href}
              {...item}
              isCurrent={pathname.startsWith(item.href)}
            />
          ))
        ) : (
          <BaseText>ログインしてね</BaseText>
        )}
      </div>
    </AppShell.Navbar>
  )
}
