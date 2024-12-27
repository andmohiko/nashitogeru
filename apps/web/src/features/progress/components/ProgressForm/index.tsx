import { DatePickerInput } from '@mantine/dates'
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
import { FileInputWithCropper } from '~/components/Inputs/FileInputWithCropper'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import { NumberInput } from '~/components/Inputs/NumberInput'

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
  const { uid } = useFirebaseAuthContext()
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
      date: defaultValue?.date || new Date(),
      imagePath: defaultValue?.imagePaths[0] ?? undefined,
      note: defaultValue?.note || '',
      progressRate: defaultValue?.progressRate || 0,
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
            name="date"
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label="日付"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.date?.message}
                locale="ja"
                valueFormat="YYYY年MM月DD日"
                w="100%"
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextArea
                label="進捗メモ"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                minRows={4}
                maxRows={8}
                error={errors.note?.message}
              />
            )}
          />
          <Controller
            name="imagePath"
            control={control}
            render={({ field }) => (
              <FileInputWithCropper
                label="画像"
                value={field.value}
                onChange={field.onChange}
                storagePath={`images/users/${uid}/goals/${goal.goalId}/progresses`}
                error={errors.imagePath?.message}
              />
            )}
          />
          <Controller
            name="progressRate"
            control={control}
            render={({ field }) => (
              <NumberInput
                label="達成率"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.progressRate?.message}
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
