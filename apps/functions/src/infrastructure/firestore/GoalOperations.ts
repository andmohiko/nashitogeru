import { db } from '~/lib/firebase'
import type { GoalId, UpdateGoalDto } from '~/entities/Goal'
import { goalsCollection } from '~/entities/Goal'

export const updateGoalOperation = async (
  goalId: GoalId,
  dto: UpdateGoalDto,
): Promise<void> => {
  await db
    .collection(goalsCollection)
    .doc(goalId)
    .update({ ...dto })
}
