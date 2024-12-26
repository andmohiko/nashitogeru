import { Textarea as MantineTextArea } from '@mantine/core'

type Props = {
  label: React.ReactNode
  value?: string
  onChange?: () => void
  onBlur?: () => void
  error?: React.ReactNode
  minRows?: number
  maxRows?: number
}

export const TextArea = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  minRows = 3,
  maxRows = 6,
}: Props): React.ReactNode => {
  return (
    <MantineTextArea
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      size="lg"
      minRows={minRows}
      maxRows={maxRows}
      autosize
      w="100%"
    />
  )
}
