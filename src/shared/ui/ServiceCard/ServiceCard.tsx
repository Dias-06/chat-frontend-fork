import { AddButton } from "../AddButton";
import apartment_icon from '../../assets/icons/А-недвижимость.svg'
import video_icon from "../../assets/icons/A-video.svg"
import ads_icon from '../../assets/icons/А-объявления.svg'
import restaurant_icon from "../../assets/icons/А-рестораны.svg"

interface ServiceCardProps{
    variant: "apartment" | "video" | "restaurant" | "ads"
    variantButton?: "default" | "added"
}

export const ServiceCard = (props: ServiceCardProps) => {
    const {variantButton="default", variant} = props;

    const config = {
      apartment: {
        icon: apartment_icon,
        title: "А-недвижимость",
        description: "Удобный сервис покупки и аренды жилья",
      },
      video: {
        icon: video_icon,
        title: "А-видео",
        description: "Удобный сервис покупки и аренды жилья",
      },
      restaurant: {
        icon: restaurant_icon,
        title: "А-рестораны",
        description: "Удобный сервис покупки и аренды жилья",
      },
      ads: {
        icon: ads_icon,
        title: "А-объявления",
        description: "Удобный сервис покупки и аренды жилья",
      }
    }
    const cur_config = config[variant];
  return (
    <div className="flex items-center h-[228px] flex-col gap-3 bg-white text-overlay-dark px-[5px] py-5 rounded-2xl border-[#CEC8FF] border">
        <div className="flex items-center flex-col gap-1">
            <img width={23} height={18} src={cur_config.icon.src} alt="" />
            <h1 className="text-[16px] font-semibold">{cur_config.title}</h1>
        </div>
        <p className="font-normal text-[14px] text-center">{cur_config.description}</p>
        <a className="text-gray font-medium text-[14px] border-b-2 leading-[120%]" href="/">Подробнее</a>
        <AddButton variant={variantButton} size="sm" ></AddButton>
    </div>
  )
}