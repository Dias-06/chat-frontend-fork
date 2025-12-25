import { ImagesNode } from "./ImagesNode";

interface ImagesNodeProps {
  images: string[];
  time: string;
}

export const ImagesMessage = ({ images, time }: ImagesNodeProps) => {
  return (
    <div className="h-fit max-w-57 relative">
      <ImagesNode images={images} />
      <p className="w-fit px-1.5 py-0.5 rounded-full text-sm text-white leading-[1.2] bg-[#00000066] absolute bottom-2.5 right-3">
        {time}
      </p>
    </div>
  );
};
