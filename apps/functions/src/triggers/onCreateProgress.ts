import * as functions from 'firebase-functions/v1'

import { convertProgressForSnapOperation } from '~/infrastructure/firestore/ProgressOperations'
import { serverTimestamp } from '~/lib/firebase'
import { triggerOnce } from '~/utils/triggerOnce'
import { updateGoalOperation } from '~/infrastructure/firestore/GoalOperations'

const onCreateProgress = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB' as const,
  })
  .firestore.document('/goals/{goalId}/progresses/{progressId}')
  .onCreate(
    triggerOnce('progress', async (snap, context) => {
      const goalId = context.params.goalId
      const progressId = context.params.progressId
      const progress = convertProgressForSnapOperation(progressId, snap.data())

      try {
        await updateGoalOperation(goalId, {
          progressRate: progress.progressRate,
          updatedAt: serverTimestamp,
        })
      } catch (error) {
        console.error(error)
      }
    }),
  )

export default onCreateProgress
