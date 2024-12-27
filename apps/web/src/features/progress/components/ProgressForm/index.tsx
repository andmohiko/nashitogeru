import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Goal, Progress } from '@nashitogeru/common'

import styles from './style.module.css'

import type { EditProgressInputType } from '~/features/progress/types'
import { editProgressSchema } from '~/features/progress/types'
import { TextArea } from '~/components/Inputs/TextArea'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { FlexBox } from '~/components/Base/FlexBox'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { DeleteButton } from '~/components/Buttons/DeleteButton'
import { useMutateProgress } from '~/features/progress/hooks/useMutateProgress'

type Props = {
  goal: Goal
  defaultValue?: Progress
  onClose: () => void
}

export const ProgressForm = ({
  goal,
  defaultValue,
  onClose,
}: Props): React.ReactNode => {
  const { startLoading, stopLoading } = useLoadingContext()
  const { showErrorToast, showSuccessToast } = useToast()
  const { createProgress, updateProgress } = useMutateProgress()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProgressInputType>({
    resolver: zodResolver(editProgressSchema),
    mode: 'all',
    defaultValues: {
      note: defaultValue?.note || '',
    },
  })

  const onSubmit = async (data: EditProgressInputType) => {
    startLoading()
    try {
      if (defaultValue) {
        await updateProgress(goal.goalId, defaultValue.progressId, data)
      } else {
        await createProgress(goal.goalId, data)
      }
      showSuccessToast('保存しました')
      reset()
      onClose()
    } catch (e) {
      console.error('error', e)
      showErrorToast(errorMessage(e))
    } finally {
      stopLoading()
    }
  }

  const onDelete = async () => {
    startLoading()
    try {
      if (!defaultValue) {
        return
      }
      showSuccessToast('削除しました')
      onClose()
    } catch (e) {
      console.error('error', e)
      showErrorToast(errorMessage(e))
    } finally {
      stopLoading()
    }
  }

  return (
    <div className={styles.goalInput}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FlexBox gap={16}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextArea
                label="進捗メモ"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                minRows={3}
                maxRows={6}
                error={errors.note?.message}
              />
            )}
          />
        </FlexBox>
        <FlexBox gap={32}>
          <BasicButton type="submit" loading={isSubmitting} fullWidth>
            保存
          </BasicButton>
          <DeleteButton onClick={onDelete} disabled={!defaultValue} fullWidth>
            削除
          </DeleteButton>
        </FlexBox>
      </form>
    </div>
  )
}
