'use client';

import React, { ChangeEvent, useRef } from 'react';

import ImageViewer from '@/components/edit/ImageViewer';
import { PictureIcon } from '@/components/icons';

type Props = {
  updateImageFiles: (files: File[]) => void;
  imageFiles: File[];
};

export default function ImageUploader({ updateImageFiles, imageFiles }: Props) {
  const inputRef = useRef(null);

  const onClickUpload = () => {
    if (!inputRef?.current) {
      return;
    }
    (inputRef.current as HTMLInputElement).click();
  };
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (!files) return;
    const imgArray = Array.from(files);
    updateImageFiles([...imageFiles, ...imgArray]);
  };

  return (
    <>
      {imageFiles.length !== 0 && (
        <ImageViewer images={imageFiles} setImages={updateImageFiles} />
      )}
      <div
        className='w-40 h-40 border-[1px] rounded-md text-gray flex justify-center items-center bg-slate-50 cursor-pointer text-3xl text-neutral-500 hover:opacity-70 trasition-all duration-100'
        onClick={onClickUpload}
      >
        <PictureIcon />
      </div>
      <input
        type='file'
        accept='image/*'
        className='hidden'
        multiple
        ref={inputRef}
        onChange={onChangeInput}
      />
    </>
  );
}
