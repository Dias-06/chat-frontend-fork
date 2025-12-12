export const MsgBubble = () => {
  const images = [
    "https://i.pinimg.com/736x/a5/9a/89/a59a89cd9200685a78129a6f509448be.jpg",
    "https://i.pinimg.com/1200x/18/74/40/1874402736f5e62660a0824dd4e0eb3c.jpg",
    "https://i.pinimg.com/1200x/20/55/ec/2055ec173eba4f16e4fb0187522d9d4e.jpg",
  ];

  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-fit h-fit px-3 py-2.5 flex gap-1.5 bg-white rounded-2xl rounded-bl-[4px]">
        <p className="leading-[1.3]">Message goes here</p>
        <p className="text-sm text-gray leading-[1.2] self-end">11:52</p>
      </div>

      <div className="h-fit w-57 relative">
        <img
          className="rounded-2xl rounded-bl-[4px]"
          src={images[0]}
          alt="picture"
        />
        <p className="w-fit px-1.5 py-0.5 rounded-full text-sm text-white leading-[1.2] bg-[#00000066] absolute bottom-2.5 right-3">
          11:52
        </p>
      </div>

      <div className="h-fit w-57 relative rounded-2xl rounded-bl-[4px] grid grid-cols-2 gap-0.5 overflow-hidden">
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
        <p className="w-fit px-1.5 py-0.5 rounded-full text-sm text-white leading-[1.2] bg-[#00000066] absolute bottom-2.5 right-3">
          11:52
        </p>
      </div>

      <div className="h-fit w-57">
        <img
          className="rounded-tr-2xl rounded-tl-2xl"
          src={images[0]}
          alt="picture"
        />
        <div className="px-3 py-2.5 flex gap-1.5 justify-between bg-white rounded-br-2xl rounded-bl-[4px]">
          <p className="leading-[1.3]">Message goes here</p>
          <p className="text-sm text-gray leading-[1.2] self-end">11:52</p>
        </div>
      </div>

      <div className="h-fit w-57">
        <div className="rounded-tr-2xl rounded-tl-2xl grid grid-cols-2 gap-0.5 overflow-hidden">
          {images.map((img, i) => {
            const isLastOdd =
              i === images.length - 1 && images.length % 2 !== 0;
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
        <div className="px-3 py-2.5 flex gap-1.5 justify-between bg-white rounded-br-2xl rounded-bl-[4px]">
          <p className="leading-[1.3]">Message goes here</p>
          <p className="text-sm text-gray leading-[1.2] self-end">11:52</p>
        </div>
      </div>
    </div>
  );
};
