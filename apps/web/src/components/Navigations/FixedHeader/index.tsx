import { AppShell, Burger } from '@mantine/core'

import styles from './style.module.css'

import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  isOpenMenu?: boolean
  toggleMenu?: () => void
}

export const FixedHeader = ({
  isOpenMenu,
  toggleMenu,
}: Props): React.ReactNode => {
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
          <h1 className={styles.title}>成し遂げる!!</h1>
        </FlexBox>
      </FlexBox>
    </AppShell.Header>
  )
}
