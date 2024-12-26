import { type ReactNode } from 'react'
import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { BottomFooter } from '~/components/Navigations/BottomFooter'
import { LoadingContentOverlay } from '~/components/Base/Loading'
import { FlexBox } from '~/components/Base/FlexBox'
import { FixedHeader } from '~/components/Navigations/FixedHeader'
import { NavMenu } from '~/components/Navigations/NavMenu'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { useGoalContext } from '~/providers/GoalProvider'

type Props = {
  children: ReactNode
  isShowFooter?: boolean
}

const headerHeight = 60
const footerHeight = 40

export const DefaultLayout = ({
  children,
  isShowFooter = false,
}: Props): ReactNode => {
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
          height: `calc(100vh - ${headerHeight}px - ${
            isShowFooter ? footerHeight : 0
          }px)`,
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
        {isShowFooter && <BottomFooter />}
      </AppShell.Main>
    </AppShell>
  )
}
