import Image from 'next/image';
import React, { MouseEventHandler } from 'react';

import { CancelIcon } from '@/components/icons';

type Props = {
  images: string[] | File[];
  setImages: ((files: File[]) => void) | ((urls: string[]) => void);
};
export default function ImageViewer({ images, setImages }: Props) {
  const onClickDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const clickedIndex = e.currentTarget.dataset.index;
    setImages(
      (images as Array<any>)?.filter((v, i) => i !== Number(clickedIndex))
    );
  };
  return (
    <>
      {images.map((img, idx) => (
        <div className='relative h-40 w-40 rounded-md border-[1px]' key={idx}>
          <Image
            src={typeof img === 'string' ? img : URL.createObjectURL(img)}
            key={idx}
            fill
            alt='project image'
          />
          <button
            className='absolute top-1 right-1 bg-white rounded-full'
            data-index={idx}
            onClick={onClickDelete}
          >
            <CancelIcon />
          </button>
        </div>
      ))}
    </>
  );
}
