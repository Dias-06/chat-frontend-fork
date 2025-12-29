'use client';
import Arrow from "@/shared/assets/icons/Arrow"
import apartment_icon from '../../assets/icons/А-недвижимость.svg'
import video_icon from "../../assets/icons/A-video.svg"
import ads_icon from '../../assets/icons/А-объявления.svg'
import restaurant_icon from "../../assets/icons/А-рестораны.svg"
import { LazyMotion, domMax, m, useAnimation } from "framer-motion";
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
  const [isOpen,setIsOpen] = useState(false)
  const {variant} = props;
  const controls = useAnimation();
  const cur_config = config[variant];
  return (
    <div className="relative overflow-hidden w-full">
      <LazyMotion features={domMax}>
        <m.div drag = "x"
         className="py-4 bg-white border-b cursor-grab active:cursor-grabbing relative z-10"
         dragConstraints = {{right: 0,left: -63}}
         dragElastic = {0.1}
         animate = {controls}
         onDragEnd={(ev,info) =>{
            if(!isOpen){
              if(info.velocity.x < -100 || info.offset.x < -31){
                controls.start({x: -63})
                setIsOpen(true);
              }
              else{
                controls.start({x: 0})
              }
            }
            else{
              if(info.velocity.x > 300 || info.offset.x > 31){
                  controls.start({x: 0})
                  setIsOpen(false)
              }
              else{
                controls.start({x: -63})    
              }
            }
         }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={cur_config.icon.src} alt="" />
              <span className="text-black text-[18px]">
                {cur_config.title}
              </span>
            </div>
            <div className="w-[63px] flex items-center justify-center">
              <Arrow width={11} height={20} />
            </div>
          </div>
        </m.div>
      </LazyMotion>
        
      {/* Кнопка удаления */}
      <div className="absolute right-0 top-0 bottom-0 w-[63px] bg-error flex items-center justify-center">
        <button>
          <svg width="14" height="18" viewBox="0 0 14 18">
            <path
              d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  )

}
export default AddedService