import type { Goal, GoalId } from '@nashitogeru/common'
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext } from 'react'

import { useGoals } from '~/hooks/useGoals'

const GoalContext = createContext<{
  goals: Array<Goal>
  isLoading: boolean
  findGoalById: (goalId: GoalId) => Goal | undefined
}>({
  goals: [],
  isLoading: false,
  findGoalById: () => undefined,
})

const GoalProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [goals, isLoading] = useGoals()

  const findGoalById = useCallback(
    (goalId: GoalId) => {
      return goals.find((goal) => goal.goalId === goalId)
    },
    [goals],
  )

  return (
    <GoalContext.Provider value={{ goals, isLoading, findGoalById }}>
      {children}
    </GoalContext.Provider>
  )
}

export { GoalContext, GoalProvider }

export const useGoalContext = () => useContext(GoalContext)
