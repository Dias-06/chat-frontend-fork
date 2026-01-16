import React, { useEffect, useState } from 'react'

interface Props{
    message: string,
    className?: string,
    isOpen: boolean,
    duration?: number,
    undo: () => void,
    onClose: () => void
}

const Snackbar = (props: Props) => {
  const {message,className,isOpen,duration = 5000,undo,onClose} = props;
  const [timeLeft,setTimeLeft] = useState(duration);
  useEffect(() => {
    if(!isOpen) return;
    const timer = setTimeout(onClose,duration)

    setTimeLeft(duration)
    const interval = setInterval(() => setTimeLeft(prev => {
      const newTime = prev - 100
      if(newTime <= 0){
        clearInterval(interval)
        return 0
      }
      return newTime
    }),100)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  },[isOpen])

  const radius = 10
  const circleLength = 2 * Math.PI * radius
  const progres = timeLeft / duration * 100
  const offset = circleLength - (progres / 100) * circleLength
  if(!isOpen) return null;
  return (
    <div className={`bg-[#000000B3] py-3 px-4 rounded-[14px] w-full flex items-center justify-between font-normal ${className}`}>
        <div className='flex items-center gap-2'>
            <svg width="24" height="24">
                <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#4fd1c5"
                strokeWidth="2"
                strokeDasharray={circleLength}
                strokeDashoffset={offset}
                fill="none"
                transform="rotate(-90 12 12)"
                />
                <text 
                  x="12" 
                  y="16" 
                  textAnchor="middle" 
                  fontSize="14" 
                  fill="#4fd1c5"
                >
                  {Math.ceil(timeLeft / 1000)}
                </text>
            </svg>
            <span className='text-[14px] text-white'>{message}</span>
        </div>
        <button onClick={undo} className='text-primary-light text-[16px]'>Отмена</button>
    </div>
  )
}

export default Snackbar