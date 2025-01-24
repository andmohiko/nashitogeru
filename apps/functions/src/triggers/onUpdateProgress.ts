import * as functions from 'firebase-functions/v1'

import { convertProgressForSnapOperation } from '~/infrastructure/firestore/ProgressOperations'
import { serverTimestamp } from '~/lib/firebase'
import { triggerOnce } from '~/utils/triggerOnce'
import { updateGoalOperation } from '~/infrastructure/firestore/GoalOperations'

const onUpdateProgress = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB' as const,
  })
  .firestore.document('/goals/{goalId}/progresses/{progressId}')
  .onUpdate(
    triggerOnce('progress', async (snap, context) => {
      const goalId = context.params.goalId
      const progressId = context.params.progressId
      const progressBefore = convertProgressForSnapOperation(
        progressId,
        snap.before.data(),
      )
      const progressAfter = convertProgressForSnapOperation(
        progressId,
        snap.after.data(),
      )

      try {
        if (progressBefore.progressRate !== progressAfter.progressRate) {
          await updateGoalOperation(goalId, {
            progressRate: progressAfter.progressRate,
            updatedAt: serverTimestamp,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }),
  )

export default onUpdateProgress
