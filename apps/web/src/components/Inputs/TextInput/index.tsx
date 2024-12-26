import { TextInput as MantineTextInput } from '@mantine/core'

type Props = {
  label: React.ReactNode
  placeHolder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  error?: React.ReactNode
}

export const TextInput = ({
  label,
  placeHolder,
  value,
  onChange,
  onBlur,
  error,
}: Props): React.ReactNode => {
  return (
    <MantineTextInput
      label={label}
      placeholder={placeHolder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      size="lg"
      w="100%"
    />
  )
}
