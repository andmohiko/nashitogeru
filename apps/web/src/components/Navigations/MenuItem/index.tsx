import Link from 'next/link'

import styles from './style.module.css'

export type MenuItemProps = {
  label: string
  href: string
  isCurrent?: boolean
}

export const MenuItem = ({ label, href, isCurrent = false }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={styles.menuItem}
      style={{
        backgroundColor: isCurrent ? '#999' : undefined,
        color: isCurrent ? '#fff' : undefined,
      }}
    >
      {label}
    </Link>
  )
}
