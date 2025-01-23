import type { Goal, GoalId } from '@nashitogeru/common'
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext } from 'react'

import { useGoals } from '~/hooks/useGoals'

const GoalContext = createContext<{
  goals: Array<Goal>
  isLoading: boolean
  findMyGoalById: (goalId: GoalId) => Goal | undefined
}>({
  goals: [],
  isLoading: false,
  findMyGoalById: () => undefined,
})

const GoalProvider = ({ children }: { children: ReactNode }): ReactNode => {
  const [goals, isLoading] = useGoals()

  const findMyGoalById = useCallback(
    (goalId: GoalId) => {
      return goals.find((goal) => goal.goalId === goalId)
    },
    [goals],
  )

  return (
    <GoalContext.Provider value={{ goals, isLoading, findMyGoalById }}>
      {children}
    </GoalContext.Provider>
  )
}

export { GoalContext, GoalProvider }

export const useGoalContext = () => useContext(GoalContext)
