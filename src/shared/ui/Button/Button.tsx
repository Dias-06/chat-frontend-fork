import  { ReactNode } from 'react'
interface ButtonProps{
  variant: 'primary' | 'secondary' | 'disabled' | 'transparent',
  full: boolean,
  children: ReactNode,
  size: 'lg' | 'md' | 'sm'
} 
const Button = (props : ButtonProps) => {
   const {variant, children, size,full} = props;
   const variants = {
    primary: 'bg-primary text-white hover:bg-[#AA9FED] cursor-pointer ',
    disabled: 'bg-[#E4E4E4] text-[#C5C5C5] cursor-not-allowed',
    secondary: 'bg-transparent border-primary border-2 text-primary hover:bg-primary hover:text-white cursor-pointer',
    transparent: 'bg-transparent text-primary cursor-pointer'
   }
   const sizes = {
    lg: 'font-medium text[18px] py-4 px-[24px] leading-[120%]',
    md: 'font-normal text[17px] py-4 px-[24px] leading-[120%]',
    sm: 'font-normal text[14px] px-4 py-0.5 min-w-[89px] leading-[30px]'
   }
  return (
    <button className={`duration-200 ${full && 'w-full'}  flex items-center justify-center transition-all border-0 rounded-lg ${variants[variant]} ${sizes[size]}`}>{children}</button>
  )
}

export default Button