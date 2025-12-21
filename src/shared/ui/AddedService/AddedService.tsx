import Arrow from "@/shared/assets/icons/Arrow"
import apartment_icon from '../../assets/icons/А-недвижимость.svg'
import video_icon from "../../assets/icons/A-video.svg"
import ads_icon from '../../assets/icons/А-объявления.svg'
import restaurant_icon from "../../assets/icons/А-рестораны.svg"
import { useState } from "react"
interface AddedServiceProps{
    variant: "apartment" | "video" | "restaurant" | "ads"
}
const config = {
    apartment: {
        icon: apartment_icon,
        title: "А-недвижимость",
      },
      video: {
        icon: video_icon,
        title: "А-видео",
      },
      restaurant: {
        icon: restaurant_icon,
        title: "А-рестораны",
      },
      ads: {
        icon: ads_icon,
        title: "А-объявления",
      }
}

const AddedService = (props:AddedServiceProps) => {
  const [touchStart, setTouchStart] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  function handleTouchStart(e : React.TouchEvent<HTMLDivElement>){
    if(swipeOffset == 63){
      setSwipeOffset(-63);
    }
    else{
      setTouchStart(e.targetTouches[0].clientX);
      setIsSwiping(true);
    }

  }
  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>){  
    const current_pos = e.targetTouches[0].clientX;
    const diff = touchStart - current_pos;
    if(diff > 0 && diff <= 63){
      setSwipeOffset(diff);
    }
  }
  function handleTouchEnd(){
    setIsSwiping(false);
    if(swipeOffset < 30){
      setSwipeOffset(0);
    }
    else{
      setSwipeOffset(63);
    }
  }

  function handleMouseStart(e : React.MouseEvent<HTMLDivElement>){
    if(swipeOffset == 63){
      setSwipeOffset(-63);
    }
    else{
      setTouchStart(e.clientX);
      setIsSwiping(true);
    }
  }
  function handleMouseMove(e : React.MouseEvent<HTMLDivElement>){
    const cur_pos = e.clientX;
    const diff = touchStart - cur_pos;
    if(diff > 0 && diff <=63){
      setSwipeOffset(diff);
    }
  }
  function handleMouseEnd(){
    setIsSwiping(false);
    if(swipeOffset < 30){
      setSwipeOffset(0);
    }
    else{
      setSwipeOffset(63);
    }
  }
  const {variant} = props;
  const cur_config = config[variant];
  return (
    <div className="relative overflow-hidden w-full">
        <div className="absolute right-0 top-0 bottom-0 w-[63px] bg-error flex items-center justify-center">
          <button
            className="flex items-center justify-center"
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="white"/>
            </svg>
          </button>
        </div>
        <div
          className="py-4 bg-white border-b cursor-grab active:cursor-grabbing"
          style={{
            transform: `translateX(-${swipeOffset}px)`,
            transition: isSwiping ? 'none' : 'transform 0.3s ease-out'
          }}
          onTouchStart={(e) => handleTouchStart(e)}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={handleTouchEnd}
          onMouseDown={(e) => handleMouseStart(e)}
          onMouseMove={(e) => handleMouseMove(e)}
          onMouseUp={handleMouseEnd}
          onMouseLeave={handleMouseEnd}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <img src={cur_config.icon.src} alt="" />
              </div>
              <span className="text-black font-normal text-[18px]">{cur_config.title}</span>
            </div>
            <div className="w-[63px] flex items-center justify-center">
              <Arrow width={11} height={20}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AddedService