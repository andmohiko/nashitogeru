import { Textarea as MantineTextArea } from '@mantine/core'

type Props = {
  label: React.ReactNode
  value?: string
  onChange?: () => void
  onBlur?: () => void
  error?: React.ReactNode
  minRows?: number
  maxRows?: number
  size?: 'sm' | 'md' | 'lg'
}

export const TextArea = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  minRows = 3,
  maxRows = 6,
  size,
}: Props): React.ReactNode => {
  return (
    <MantineTextArea
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      size={size}
      minRows={minRows}
      maxRows={maxRows}
      autosize
      w="100%"
    />
  )
}
