import { NumberInput as MantineNumberInput } from '@mantine/core'

type Props = {
  label: React.ReactNode
  placeHolder?: string
  value?: number
  onChange?: () => void
  onBlur?: () => void
  error?: React.ReactNode
}

export const NumberInput = ({
  label,
  placeHolder,
  value,
  onChange,
  onBlur,
  error,
}: Props): React.ReactNode => {
  return (
    <MantineNumberInput
      label={label}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      w="100%"
    />
  )
}
