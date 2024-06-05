import React, { FormEventHandler, MouseEventHandler, useRef } from 'react';
import { UseFormSetValue } from 'react-hook-form';

type Props = {
  setValue: UseFormSetValue<any>;
  currentSkills: string[];
  fullWidth?: boolean;
};
export default function SkillForm({
  setValue,
  currentSkills,
  fullWidth = false,
}: Props) {
  const skillInputRef = useRef(null);
  const addSkill: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!skillInputRef.current) {
      return;
    }
    let { value } = skillInputRef.current as HTMLInputElement;
    if (currentSkills.includes(value)) {
      alert('This tag is already registered.');
      return;
    }
    setValue('skills', [value, ...currentSkills]);
    (skillInputRef.current as HTMLInputElement).value = '';
  };
  const deleteSkill: MouseEventHandler<HTMLLIElement> = (e) => {
    setValue(
      'skills',
      currentSkills.filter((v) => v !== (e.target as HTMLLIElement).textContent)
    );
  };
  return (
    <>
      <form onSubmit={addSkill}>
        <input
          className={`py-2 px-4 border-[1px] rounded-md outline-sky-500 w-full ${
            fullWidth ? '' : 'max-w-[500px]'
          }`}
          ref={skillInputRef}
          placeholder='Type and press enter'
        />
      </form>
      <ul className='flex gap-2 flex-wrap items-center mt-4'>
        {currentSkills.map((skill) =>
          skill ? (
            <li
              key={skill}
              className='py-1 px-2 rounded-lg text-sm bg-neutral-500 text-white font-bold hover:scale-105 hover:bg-blue-400 transition-all duration-100'
              onClick={deleteSkill}
            >
              {skill}
            </li>
          ) : (
            <></>
          )
        )}
      </ul>
      <p className='text-sm mt-2 text-red-500'>
        * You can delete it by clicking on the tag.
      </p>
    </>
  );
}
