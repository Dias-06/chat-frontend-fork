import { ReactNode } from "react"
import { AddButton } from "../AddButton";

interface ServiceCardProps{
    title: string,
    description: string,
    icon: ReactNode,
    variant?: "default" | "added"
}

export const ServiceCard = (props: ServiceCardProps) => {
    const {title,description,icon,variant="default"} = props;
  return (
    <div className="flex items-center h-[228px] flex-col gap-3 bg-white text-overlay-dark px-[5px] py-5 rounded-2xl border-[#CEC8FF] border">
        <div className="flex items-center flex-col gap-1">
            {icon}
            <h1 className="text-[16px] font-semibold">{title}</h1>
        </div>
        <p className="font-normal text[14px] text-center">{description}</p>
        <a className="text-gray font-medium text-[14px] underline" href="/">Подробнее</a>
        <AddButton variant={variant} size="sm" ></AddButton>
    </div>
  )
}