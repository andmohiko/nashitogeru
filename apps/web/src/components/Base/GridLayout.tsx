type Props = {
  children: React.ReactNode
  gridTemplateColumns?: string
  gridTemplateRows?: string
  justify?: string
  align?: string
  width?: number | string
  height?: number | string
  gap?: number
  px?: number
  py?: number
  pt?: number
  pr?: number
  pb?: number
  pl?: number
  mx?: number
  my?: number
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  style?: Record<string, string | number>
  onClick?: () => void
}

export const GridLayout = ({
  children,
  gridTemplateColumns = '1fr',
  gridTemplateRows = '1fr',
  justify = 'center',
  align = 'center',
  width = '100%',
  height = '100%',
  gap = 0,
  px = 0,
  py = 0,
  pt = 0,
  pr = 0,
  pb = 0,
  pl = 0,
  mx = 0,
  my = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
  style = {},
  onClick,
  ...props
}: Props) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onClick}
    onKeyDown={onClick}
    style={{
      display: 'grid',
      gridTemplateColumns,
      gridTemplateRows,
      justifyItems: justify,
      alignItems: align,
      width,
      height,
      gap,
      padding: `${pt || py}px ${pr || px}px ${pb || py}px ${pl || px}px`,
      margin: `${mt || my}px ${mr || mx}px ${mb || my}px ${ml || mx}px`,
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
)
