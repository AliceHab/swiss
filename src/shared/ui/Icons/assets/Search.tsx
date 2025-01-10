import { Svg, IconProps } from '../Svg'

export const Search = ({ ...props }: IconProps) => (
  <Svg {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
      d="M7.684 14.61a6.684 6.684 0 1 0 0-13.367 6.684 6.684 0 0 0 0 13.367Z"
    />
    <path
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth=".6"
      d="M4.147 7.927A3.536 3.536 0 0 1 7.683 4.39"
    />
    <path
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth="1.6"
      d="M12.643 12.4 17 16.756"
    />
  </Svg>
)
