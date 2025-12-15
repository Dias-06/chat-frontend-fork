import { ReactNode } from "react"
interface ButtonProps{
  variant: 'added' | 'default',
  onclick?: () => void,
  disabled?: boolean,
  full?: boolean,
  children?: ReactNode,
  size: 'lg' | 'md' | 'sm'
} 
const AddButton = (props:ButtonProps) => {
  const {variant,
        onclick,
        disabled = false,
        full=true,
        children,
        size} = props;

  const sizes = {
    lg: 'font-medium text[18px] py-4 px-[24px] leading-[120%]',
    md: 'font-normal text[17px] py-4 px-[24px] leading-[120%]',
    sm: 'font-normal text[14px] px-4 py-[14px] min-w-[89px] leading-[120%]'
   }
   const base_styles = 'flex gap-2.5 items-center justify-center border-2 rounded-lg cursor-pointer'

    const config = {
      default: {
        text: 'Добавить',
        styles: 'border-primary text-primary',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM12 8.8H8.8V12H7.2V8.8H4V7.2H7.2V4H8.8V7.2H12V8.8Z" fill="#7769E1"/>
          </svg>
        )
      },
      added: {
        text: 'Добавлено',
        styles: 'border-[#34C759] text-[#34C759]',
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="16" height="16" rx="8" fill="#34C759"/>
            <path d="M6 10.3284L3.375 7.8209L2.5 8.65672L6 12L13.5 4.83582L12.625 4L6 10.3284Z" fill="white"/>
          </svg>
        )
    }
  }
  const cur_config = config[variant]
  return (
    <button disabled = {disabled} className={`${base_styles} ${sizes[size]} ${cur_config.styles} ${full && 'w-full'}`} onClick={onclick}>
      <span>{children || cur_config.text}</span>
      {cur_config.icon}
    </button>
  )
}

export default AddButton