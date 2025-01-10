import { Svg, IconProps } from '../Svg'

export const Mars = ({ ...props }: IconProps) => (
  <Svg {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      d="M12.902 5.432a6.776 6.776 0 1 0-9.583 9.583 6.776 6.776 0 0 0 9.583-9.583Zm0 0 4.192-4.192M12.542 1h3.945c.468 0 .847.38.847.847v3.945"
    />
  </Svg>
)
