interface InputProps {
  isEnter?: boolean
  type: string
  id: string
  pwRef?: React.MutableRefObject<HTMLInputElement | null>
  connectRef: (e: HTMLInputElement) => void
}

export type {InputProps}
