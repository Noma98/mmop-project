'use client';

import Image from 'next/image';
import { useSWRConfig } from 'swr';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { FullMember } from '@/service/member';
import { PictureIcon } from '@/components/icons';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SkillForm from '@/components/common/SkillForm';
import FieldError from '@/components/common/FieldError';

const labelCommonStyle = `font-semibold text-lg mb-2 mt-4 block`;
const inputCommonStyle =
  'list-square text-neutral-700 border-[1px] py-2 px-4 block w-full rounded-md mb-2 outline-sky-500';

type Props = {
  data: FullMember;
  userId: string;
};
export default function UserInfoForm({ data, userId }: Props) {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, setValue, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: { ...data, profileFileBlob: null },
  });
  const formData = watch();
  const { mutate } = useSWRConfig();
  const { errors } = formState;

  const onClickImageSelector = () => {
    if (!fileInputRef.current) return;
    (fileInputRef.current as HTMLInputElement).click();
  };
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    //@ts-ignore
    setValue('profileFileBlob', e.currentTarget.files[0] as File);
  };
  const onSubmit = () => {
    const formDataToBeSubmitted = new FormData();
    formDataToBeSubmitted.append('data', JSON.stringify(formData));
    formDataToBeSubmitted.append('file', formData.profileFileBlob || '');
    setIsLoading(true);

    fetch('/api/member', {
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
    <section className='rounded-xl bg-white p-8 mt-12 w-full max-w-[660px] z-10'>
      <h3 className='font-bold text-xl'>User Information</h3>
      <label className={labelCommonStyle}>Name</label>
      <input
        {...register('userName', {
          required: {
            message: 'Please fill out this field.',
            value: true,
          },
        })}
        className={inputCommonStyle}
      />
      {errors.userName && (
        <FieldError message={errors.userName.message as string} />
      )}
      <label className={labelCommonStyle}>Phone Number</label>
      <input
        maxLength={15}
        {...register('phoneNum', {
          pattern: {
            value: /\d+/,
            message: 'Please enter your phone number only with numbers.',
          },
        })}
        className={inputCommonStyle}
      />
      {errors.phoneNum && (
        <FieldError message={errors.phoneNum.message as string} />
      )}
      <label className={labelCommonStyle}>Profile Image</label>
      <input
        {...register('profile')}
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
        {data.profile || data.googleProfile ? (
          <Image
            src={
              formData.profileFileBlob
                ? URL.createObjectURL(formData.profileFileBlob)
                : data.profile || data.googleProfile
            }
            alt='profile'
            width={160}
            height={160}
            className='rounded-md'
          />
        ) : (
          <PictureIcon />
        )}
      </div>
      <label className={labelCommonStyle}>Skills</label>
      <SkillForm
        setValue={setValue}
        currentSkills={formData.skills}
        fullWidth
      />
      <label className={labelCommonStyle}>Github URL</label>
      <input {...register('github')} className={inputCommonStyle} />
      {errors.github && (
        <FieldError message={errors.github.message as string} />
      )}
      <button
        className='p-4 rounded-lg bg-neutral-800 text-white font-bold mt-8 w-full hover:opacity-70 h-16'
        onClick={handleSubmit(onSubmit)}
      >
        {isLoading ? <LoadingSpinner isPadding={false} /> : `Save`}
      </button>
    </section>
  );
}
