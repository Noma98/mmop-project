'use client';

import Image from 'next/image';
import { useSWRConfig } from 'swr';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FullMember } from '@/service/member';
import { PictureIcon } from '@/components/icons';
import BgColorSelector from '@/components/setting/BgColorSelector';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const labelCommonStyle = `font-semibold text-lg mb-2 mt-4 block`;
const inputCommonStyle =
  'list-square text-neutral-700 border-[1px] py-2 px-4 block w-full rounded-md mb-2 outline-sky-500';

type Props = {
  data: FullMember['setting'];
  userId: string;
};
export default function PortfolioInfoForm({ data, userId }: Props) {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: { ...data, logoFileBlob: null },
  });
  const formData = watch();
  const { mutate } = useSWRConfig();

  const onClickImageSelector = () => {
    if (!fileInputRef.current) return;
    (fileInputRef.current as HTMLInputElement).click();
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //@ts-ignore
    setValue('logoFileBlob', e.currentTarget.files[0] as File);
  };
  const onSubmit = () => {
    const formDataToBeSubmitted = new FormData();
    formDataToBeSubmitted.append('data', JSON.stringify(formData));
    formDataToBeSubmitted.append('file', formData.logoFileBlob || '');

    setIsLoading(true);
    fetch('/api/setting', {
      method: 'PUT',
      body: formDataToBeSubmitted,
    })
      .then(() => {
        mutate(`/api/member/${userId}`);
        alert('Modified successfully.');
      })
      .catch((err) => {
        console.error('Update failed :', err);
        alert('Update failed.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className='rounded-xl bg-white p-8 mt-12 w-full max-w-[660px] z-10'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h3 className='font-bold text-xl'>Portfolio Information</h3>
          <label className={labelCommonStyle}>Title</label>
          <input {...register('title')} className={inputCommonStyle} />
          <label className={labelCommonStyle}>SubTitle</label>
          <input {...register('subtitle')} className={inputCommonStyle} />
          <label className={labelCommonStyle}>Introduction</label>
          <textarea
            {...register('introduction')}
            className={`${inputCommonStyle} resize-none h-32`}
          />
          <label className={labelCommonStyle}>Logo</label>
          <input
            {...register('logo')}
            className='hidden'
            type='file'
            ref={fileInputRef}
            accept='image/*'
            onChange={onChange}
          />
          <div
            className='w-40 h-40 rounded-md border-[1px] flex justify-center items-center bg-slate-50 cursor-pointer relative'
            onClick={onClickImageSelector}
          >
            {data.logo ? (
              <Image
                src={
                  formData.logoFileBlob
                    ? URL.createObjectURL(formData.logoFileBlob)
                    : data.logo
                }
                alt='logo'
                width={160}
                height={160}
                className='rounded-md'
              />
            ) : (
              <PictureIcon />
            )}
          </div>
          <label className={labelCommonStyle}>Background Color</label>
          <BgColorSelector colors={formData.bgColors} setValue={setValue} />
          <button
            className='p-4 rounded-lg bg-neutral-800 text-white font-bold mt-8 w-full hover:opacity-70'
            onClick={handleSubmit(onSubmit)}
          >
            Save
          </button>
        </>
      )}
    </form>
  );
}
