import React from 'react';
import Image from 'next/image';

import { FullMember } from '@/service/member';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function AboutMe({
  skills,
  googleProfile,
  profile,
  setting,
}: FullMember) {
  return (
    <section className='bg-[#ffffff] w-full p-8 py-32  relative'>
      <div className='max-w-screen-lg flex flex-col items-center mx-auto'>
        <h2 className='highlight font-bold text-4xl mb-4 bg-base px-2 border-l-[5px] border-orange-300'>
          About me
        </h2>
        <div className='flex flex-col items-center gap-16 md:flex-row md:gap-0 w-full max-w-screen-xl'>
          <Image
            src={profile || googleProfile}
            width={240}
            height={240}
            alt='profile'
            className='rounded-full shadow-md object-contain md:w-80 md:h-80'
          />
          <article className='flex-1 md:ml-12 md:pl-12 md:border-l-[1px]'>
            {setting ? (
              <>
                <p className='whitespace-pre-wrap'>
                  {setting?.introduction || "There's no content..."}
                </p>
                <h4 className='font-bold text-xl bg-base inline-block mt-8 px-2'>
                  Skills
                </h4>
                <ul className='flex gap-2 flex-wrap items-center mt-4'>
                  {skills.length === 0 ? (
                    <p>There&apos;s no content...</p>
                  ) : (
                    skills?.map((skill) => (
                      <li
                        key={skill}
                        className='py-1 px-2 rounded-lg text-sm bg-neutral-500 text-white font-bold hover:scale-105 hover:bg-blue-400 transition-all duration-100'
                      >
                        {skill}
                      </li>
                    ))
                  )}
                </ul>
              </>
            ) : (
              <LoadingSpinner />
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
