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
    <section className='bg-[#ffffff] w-full p-8 pt-20 mb-10 flex flex-col items-center relative'>
      <h2 className='highlight font-bold text-4xl mb-4 highlight-sky'>
        About me
      </h2>
      <div className='flex flex-col items-center gap-16 md:flex-row md:gap-0 w-full p-8 max-w-screen-xl'>
        <Image
          src={profile || googleProfile}
          width={240}
          height={240}
          alt='profile'
          className='rounded-full shadow-md object-contain md:w-80 md:h-80'
        />
        <article className='flex-1 md:ml-12 md:px-12 md:border-l-[1px]'>
          {setting ? (
            <>
              <h3 className='font-flower text-neutral-700 text-2xl font-bold mb-4'>
                " {setting?.subtitle} "
              </h3>
              <p className='whitespace-pre-wrap'>{setting?.introduction}</p>
              <h4 className='font-bold text-xl mt-8'>Skills</h4>
              <ul className='flex gap-2 flex-wrap items-center mt-4'>
                {skills?.map((skill) => (
                  <li
                    key={skill}
                    className='py-1 px-2 rounded-lg text-sm bg-neutral-500 text-white font-bold hover:scale-105 hover:bg-blue-400 transition-all duration-100'
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </article>
      </div>
    </section>
  );
}
