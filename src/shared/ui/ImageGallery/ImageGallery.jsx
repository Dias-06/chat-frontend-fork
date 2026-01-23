import Image from 'next/image';
import React from 'react';


const ImageGallery = ({ images = [] }) => {
  return (
    /* overflow-y-auto позволяет сетке скроллиться внутри любого контейнера */
    <div className="w-full h-full overflow-y-auto p-3">
      <div className="grid grid-cols-1 min-[360px]:grid-cols-3 gap-2">
        {images.map((photo) => (
          <div 
            key={photo.id} 
            className="relative aspect-square w-full bg-gray rounded-lg overflow-hidden"
          >
            <Image
              src={photo.src}
              alt="фото"
              fill
              sizes="(max-width: 360px) 100vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;