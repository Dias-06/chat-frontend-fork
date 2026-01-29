import React from 'react'
import { useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { Button } from '../Button'
<link rel="stylesheet" href="" />
type Props = {
  imageUrl: string
}

const ImageCropper = (props: Props) => {
  const {imageUrl} = props;
  const [crop, setCrop] = useState({ x:0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = (croppedArea : Area, croppedAreaPixels : Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div className='bg-overlay/40 inset-0 absolute -z-10 blur-xs'></div>
      <div className='p-4 rounded-lg bg-white flex flex-col gap-6 w-full mx-4 z-10'>
        <div className='flex items-center justify-between'>
          <p className='text-[16px] '>Настроить отображение фото</p>
          <span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#1C1C1E"/>
            </svg>
          </span>
        </div>
        <div className='w-50 mx-auto'>
          <div className='relative h-50 '>
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape='round'
              showGrid = {false}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <input
            type='range' 
            className='custom-range w-full'
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        </div>
        <div className='flex items-center gap-4'>
          <Button variant='secondary' type='button' size='md'>
            Отменить
          </Button>
          <Button variant='primary' type='button' size='md'>
            Выбрать фото
          </Button>
        </div>
      </div>
    </div>
    
    
  )
}
export default ImageCropper