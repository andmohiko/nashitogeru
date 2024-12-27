import { AppShell, Burger } from '@mantine/core'
import { useRouter } from 'next/router'
import { IoSettingsOutline } from 'react-icons/io5'
import Link from 'next/link'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'
import { IconButton } from '~/components/Buttons/IconButton'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'

type Props = {
  isOpenMenu?: boolean
  toggleMenu?: () => void
}

export const FixedHeader = ({
  isOpenMenu,
  toggleMenu,
}: Props): React.ReactNode => {
  const { push } = useRouter()
  const { isAuthPath } = useFirebaseAuthContext()
  return (
    <AppShell.Header px={16}>
      <FlexBox direction="row" justify="space-between">
        <FlexBox justify="flex-start" direction="row" gap={8}>
          {isOpenMenu !== undefined && toggleMenu !== undefined && (
            <Burger
              opened={isOpenMenu}
              onClick={toggleMenu}
              hiddenFrom="sm"
              size="md"
            />
          )}
          <Link href="/">
            <h1 className={styles.title}>成し遂げる!!</h1>
          </Link>
        </FlexBox>
        {isAuthPath && (
          <IconButton
            icon={<IoSettingsOutline size={24} />}
            onClick={() => push('/settings')}
            importance="tertiary"
          />
        )}
      </FlexBox>
    </AppShell.Header>
  )
}
