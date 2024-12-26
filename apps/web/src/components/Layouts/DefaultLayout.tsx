import { type ReactNode } from 'react'
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { LoadingContentOverlay } from '~/components/Base/Loading'
import { FlexBox } from '~/components/Base/FlexBox'
import { FixedHeader } from '~/components/Navigations/FixedHeader'
import { NavMenu } from '~/components/Navigations/NavMenu'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { useGoalContext } from '~/providers/GoalProvider'

type Props = {
  children: ReactNode
}

const headerHeight = 60

export const DefaultLayout = ({ children }: Props): ReactNode => {
  const { isLoading } = useLoadingContext()
  const [isOpen, { toggle }] = useDisclosure(false)
  const { goals, isLoading: isLoadingGoals } = useGoalContext()

  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: {
          mobile: !isOpen,
        },
      }}
      padding="md"
    >
      <FixedHeader isOpenMenu={isOpen} toggleMenu={toggle} />
      <NavMenu goals={goals} />
      <AppShell.Main
        bg="cyan.0"
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
          overflow: 'scroll',
        }}
      >
        <FlexBox
          justify="flex-start"
          align="flex-start"
          style={{
            position: 'relative',
          }}
        >
          {(isLoading || isLoadingGoals) && <LoadingContentOverlay />}
          {children}
        </FlexBox>
      </AppShell.Main>
    </AppShell>
  )
}
