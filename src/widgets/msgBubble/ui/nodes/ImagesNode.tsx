interface ImagesNodeProps {
  images: string[];
}

export const ImagesNode = ({ images }: ImagesNodeProps) => {
  return (
    <div className="grid grid-cols-2 gap-0.5 overflow-hidden">
      {images.map((img, i) => {
        const isLastOdd = i === images.length - 1 && images.length % 2 !== 0;
        return (
          <img
            key={img}
            className={`w-full h-full bg-cover ${
              isLastOdd ? "col-span-2" : ""
            }`}
            src={img}
            alt="picture"
          />
        );
      })}
    </div>
  );
};
