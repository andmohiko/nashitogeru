import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { GoalForm } from '~/features/goal/components/GoalForm'
import { useGoalContext } from '~/providers/GoalProvider'
import { GoalCard } from '~/features/goal/components/GoalCard'

export const GoalContainer = (): React.ReactNode => {
  const { goals, isLoading } = useGoalContext()
  return (
    <DefaultLayout>
      {/* ゴールフォーム */}
      <FlexBox mb={80}>
        <GoalForm />
      </FlexBox>
      {/* ゴールカード */}
      <FlexBox gap={16}>
        {goals.map((goal) => (
          <GoalCard key={goal.goalId} goal={goal} />
        ))}
      </FlexBox>
    </DefaultLayout>
  )
}
