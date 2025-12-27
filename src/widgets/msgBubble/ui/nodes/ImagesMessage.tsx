import { ReactNode } from "react";
import { ImagesNode } from "./ImagesNode";

interface ImagesNodeProps {
  images: string[];
  time: string;
  sentIcon: ReactNode;
}

export const ImagesMessage = ({ images, time, sentIcon }: ImagesNodeProps) => {
  return (
    <div className="h-fit max-w-57 relative">
      <ImagesNode images={images} />
      <div className="w-fit px-1.5 py-0.5 rounded-full absolute bottom-2.5 right-3 bg-[#00000066] flex gap-0.5">
        <p className="text-sm text-white leading-[1.2]">{time}</p>
        {sentIcon}
      </div>
    </div>
  );
};
