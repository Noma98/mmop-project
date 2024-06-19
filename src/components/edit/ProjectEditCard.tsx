'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';

import Label from '@/components/common/Label';
import {
  BusinessIcon,
  CancelIcon,
  GameIcon,
  GithubIcon,
  StoreIcon,
  WebIcon,
} from '@/components/icons';
import { Project } from '@/service/project';
import DateSelector from '@/components/edit/DateSelector';
import FieldError from '@/components/common/FieldError';
import ImageUploader from '@/components/edit/ImageUploader';
import ImageViewer from '@/components/edit/ImageViewer';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import SkillForm from '@/components/common/SkillForm';

const inputCommonStyle =
  'list-square text-neutral-700 border-[1px] py-2 px-4 block w-full rounded-md mb-2 outline-sky-500';
const requiredStyle = `after:content-['*'] after:text-orange-500 after:ml-1 after:mb-1`;

type Props = {
  data: Project;
};
export default function ProjectEditCard({ data }: Props) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    title,
    description,
    images,
    webLink,
    githubLink,
    storeLink,
    achievements,
    skills,
    startDate,
    endDate,
    type,
  } = data;
  const INIT_DATA = {
    id,
    title: title || '',
    type: type || 'business',
    description: description || '',
    achievements: achievements || [{ value: '' }],
    webLink: webLink || '',
    storeLink: storeLink || '',
    githubLink: githubLink || '',
    skills: skills || [],
    startDate: startDate || new Date(),
    endDate: endDate || new Date(),
    imageUrls: images || [],
    imageFiles: [],
    authorId: user?.userId,
  };
  const { control, register, handleSubmit, watch, setValue, formState } =
    useForm({
      mode: 'onSubmit',
      defaultValues: { ...INIT_DATA },
    });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'achievements',
  });
  const formData = watch();

  const linkData = [
    {
      name: 'webLink',
      text: 'Web',
      link: webLink,
      color: 'red-500',
      icon: <WebIcon />,
    },
    {
      name: 'storeLink',
      text: 'Store',
      link: storeLink,
      color: 'sky-500',
      icon: <StoreIcon />,
    },
    {
      name: 'githubLink',
      text: 'Github',
      link: githubLink,
      color: 'neutral-800',
      icon: <GithubIcon />,
    },
  ];

  const updateImageUrls = (urls: string[]) => {
    setValue('imageUrls', urls);
  };
  const updateImageFiles = (files: File[]) => {
    // @ts-ignore
    setValue('imageFiles', files);
  };
  const onDelete = async () => {
    setIsLoading(true);
    await fetch('/api/project', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })
      .then(() => {
        mutate(`/api/project/${user?.userId}?year=ALL&type=ALL`);
        alert('Deleted successfully.');
      })
      .catch(() => alert(`ERROR has occurred.\nPlease try again in a moment.`))
      .finally(() => setIsLoading(false));
  };
  const onSubmitFormData = async () => {
    setIsLoading(true);
    const formDataToBeSubmitted = new FormData();
    formDataToBeSubmitted.append('data', JSON.stringify(formData));
    formData.imageFiles.forEach((file) => {
      formDataToBeSubmitted.append('file', file);
    });

    fetch('/api/project', {
      method: id ? 'PUT' : 'POST',
      body: formDataToBeSubmitted,
    })
      .then(() => {
        mutate(`/api/project/${user?.userId}?year=ALL&type=ALL`);
        if (id) {
          alert('Modified successfully.');
        } else {
          router.push(`/id/${user?.userId}`);
        }
      })
      .catch((err) => {
        console.error('Error updating project:', err);
        alert('Error occurred.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <article className='p-10 round relative rounded-xl gap-10 m-8 shadow-md border-[1px] border-neutral-200 bg-white z-10 min-h-[300px]'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form className='flex flex-col gap-2 flex-1'>
            <h2 className='text-3xl font-bold mb-4'>
              {id ? 'Edit Project' : 'Register New Project'}
            </h2>
            <div className='flex flex-col gap-4 lg:flex-row lg:gap-24'>
              <fieldset className='flex flex-col gap-2 lg:flex-row lg:gap-16'>
                <legend className={`font-bold mr-4 mb-2 ${requiredStyle}`}>
                  Project type
                </legend>
                <label htmlFor='business' className='flex items-center gap-2'>
                  <input
                    {...register('type')}
                    type='radio'
                    value='business'
                    id='business'
                    className='mr-2 appearance-none w-5 h-5 transition-all duration-300 bg-white rounded-full border-[4px] border-neutral-400 checked:border-[6px] checked:border-sky-600 cursor-pointer'
                  />
                  <Label
                    text='Business'
                    icon={<BusinessIcon />}
                    style='bg-neutral-800'
                  />
                </label>
                <label htmlFor='side' className='flex items-center gap-2'>
                  <input
                    {...register('type')}
                    type='radio'
                    value='side'
                    id='side'
                    className='mr-2 appearance-none w-5 h-5 transition-all duration-300 bg-white rounded-full border-[4px] border-neutral-400 checked:border-[6px] checked:border-sky-600 cursor-pointer'
                  />
                  <Label text='Side' icon={<GameIcon />} style='bg-red-500 ' />
                </label>
              </fieldset>
              <div>
                <h3 className={`font-bold mb-2 mt-4 lg:mt-0 ${requiredStyle}`}>
                  Period
                </h3>
                <DateSelector
                  period={{
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                  }}
                  updateInputData={setValue}
                />
              </div>
            </div>
            <h3 className={`font-bold mb-2 mt-4 ${requiredStyle}`}>
              Project Name
            </h3>
            <input
              {...register('title', {
                required: {
                  message: 'Please fill out this field.',
                  value: true,
                },
              })}
              className={`${inputCommonStyle} ${
                errors.title
                  ? 'border-red-500 border-[2px] focus:outline-red-500'
                  : ''
              }`}
              placeholder='Project Name'
            />
            {errors.title && (
              <FieldError message={errors.title.message as string} />
            )}
            <h3 className={`font-bold mb-2 mt-4 ${requiredStyle}`}>
              Description
            </h3>
            <input
              {...register('description', {
                required: {
                  message: 'Please fill out this field.',
                  value: true,
                },
              })}
              className={`${inputCommonStyle} ${
                errors.description
                  ? 'border-red-500 border-[2px] focus:outline-red-500'
                  : ''
              }`}
              placeholder='Description'
            />
            {errors.description && (
              <FieldError message={errors.description.message as string} />
            )}
            <h3 className={`font-bold mb-2 mt-4 ${requiredStyle}`}>
              Achievements
            </h3>
            <ul>
              {fields.map((item, idx) => (
                <li className='relative' key={item.id}>
                  <input
                    {...register(`achievements.${idx}.value`, {
                      required: {
                        message: 'Please fill out this field.',
                        value: true,
                      },
                    })}
                    placeholder='Please enter your achievement related to the project.'
                    className={`${inputCommonStyle} list-square pr-12 ${
                      errors.achievements && errors.achievements[idx]
                        ? 'border-red-500 border-[2px] focus:outline-red-500'
                        : ''
                    }`}
                  />
                  {errors.achievements && errors.achievements[idx] && (
                    <FieldError
                      message={
                        errors.achievements[idx]?.value?.message as string
                      }
                    />
                  )}
                  <button
                    onClick={() => remove(idx)}
                    className='absolute right-[12px] top-[12px]'
                  >
                    <CancelIcon />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type='button'
              onClick={() => append({ value: '' })}
              className='
          bg-slate-50 p-2 rounded-md text-neutral-800 border-[1px] transition-all duration-100 hover:opacity-70'
            >
              + Add achievement
            </button>
            <h3 className='font-bold mb-2 mt-4'>Images</h3>
            <div className='flex gap-2 flex-wrap'>
              <ImageViewer
                images={formData.imageUrls}
                setImages={updateImageUrls}
              />
              {
                <ImageUploader
                  updateImageFiles={updateImageFiles}
                  imageFiles={formData.imageFiles}
                />
              }
            </div>

            <h3 className='font-bold mb-2 mt-4'>Link</h3>
            <ul className='flex flex-col max-w-[500px] gap-2'>
              {linkData.map((data, idx) => (
                <li
                  key={idx}
                  className='flex flex-col justify-center gap-4 w-full md:flex-row md:items-center'
                >
                  <Label
                    text={data.text}
                    icon={data.icon}
                    style={`bg-${data.color} justify-center text-sm h-full w-[100px] md:w-[120px] md:text-md `}
                  />
                  <input
                    {...register(
                      data.name as 'webLink' | 'storeLink' | 'githubLink'
                    )}
                    placeholder={`${data.text} link (Optional)`}
                    className='text-neutral-700 border-[1px] py-2 px-4 rounded-md mb-2 md:mb-0 outline-sky-500 flex-1 '
                  />
                </li>
              ))}
            </ul>
            <h3 className='font-bold mb-2 mt-4'>Skill tags</h3>
          </form>
          <SkillForm setValue={setValue} currentSkills={formData.skills} />
          <div className='flex rounded-md py-2 px-4 gap-4 justify-end'>
            <button
              onClick={() => router.back()}
              className='bg-white rounded-md p-2 font-bold shadow-md w-32 hover:scale-105 transition-all duration-150'
            >
              Cancel
            </button>
            {id && (
              <button
                onClick={onDelete}
                className='bg-white rounded-md p-2 font-bold shadow-md w-32 hover:scale-105 transition-all duration-150 border-[1px] text-red-500 border-red-500'
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSubmit(onSubmitFormData)}
              className='text-white font-bold bg-red-500 rounded-md p-2 w-32 shadow-md hover:scale-105 transition-all duration-150'
            >
              Save
            </button>
          </div>
        </>
      )}
    </article>
  );
}
