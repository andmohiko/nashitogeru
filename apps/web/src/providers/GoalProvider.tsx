import type { Goal } from '@nashitogeru/common'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'

import { useGoals } from '~/hooks/useGoals'

const GoalContext = createContext<{
  goals: Array<Goal>
  isLoading: boolean
}>({
  goals: [],
  isLoading: false,
})

const GoalProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [goals, isLoading] = useGoals()

  return (
    <GoalContext.Provider value={{ goals, isLoading }}>
      {children}
    </GoalContext.Provider>
  )
}

export { GoalContext, GoalProvider }

export const useGoalContext = () => useContext(GoalContext)
