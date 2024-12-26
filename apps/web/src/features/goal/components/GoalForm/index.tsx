import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Goal } from '@nashitogeru/common'

import styles from './style.module.css'

import { useMutateGoal } from '~/features/goal/hooks/useMutateGoal'
import type { EditGoalInputType } from '~/features/goal/types'
import { editGoalSchema } from '~/features/goal/types'
import { TextArea } from '~/components/Inputs/TextArea'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { FlexBox } from '~/components/Base/FlexBox'
import { TextInput } from '~/components/Inputs/TextInput'
import { useLoadingContext } from '~/providers/LoadingProvider'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'

type Props = {
  defaultValue?: Goal
  onClose: () => void
}

export const GoalForm = ({ defaultValue, onClose }: Props): React.ReactNode => {
  const { startLoading, stopLoading } = useLoadingContext()
  const { showErrorToast, showSuccessToast } = useToast()
  const { createGoal, updateGoal } = useMutateGoal()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditGoalInputType>({
    resolver: zodResolver(editGoalSchema),
    mode: 'all',
    defaultValues: {
      target: defaultValue?.target ?? '',
      description: defaultValue?.description ?? '',
    },
  })

  const onSubmit = async (data: EditGoalInputType) => {
    startLoading()
    try {
      if (defaultValue) {
        await updateGoal(defaultValue.goalId, data)
      } else {
        await createGoal(data)
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

  return (
    <div className={styles.goalInput}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FlexBox gap={16}>
          <Controller
            name="target"
            control={control}
            render={({ field }) => (
              <TextInput
                label="成し遂げることをひとことで"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeHolder="体重10kg減量"
                error={errors.target?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                label="詳細"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                minRows={3}
                maxRows={6}
                error={errors.description?.message}
              />
            )}
          />
        </FlexBox>
        <FlexBox direction="row" justify="flex-end" gap={8}>
          <BasicButton type="submit" loading={isSubmitting} width="100px">
            保存
          </BasicButton>
        </FlexBox>
      </form>
    </div>
  )
}
