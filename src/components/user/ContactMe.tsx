import React from 'react';

import { FullMember } from '@/service/member';
import Wave from '@/components/common/Wave';
import { GithubIcon, GmailIcon, PhoneIcon } from '@/components/icons';

export default function ContactMe({
  email,
  phoneNum,
  userName,
  github,
}: FullMember) {
  const copyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert('Copied it to your clipboard!'))
      .catch((err) => alert('Error occured.'));
  };

  return (
    <section className='w-full h-80 flex flex-col items-center py-32 pb-[500px] bg-point3'>
      <h2 className='highlight font-bold text-4xl mb-4 bg-point2 px-2 border-l-[6px] border-orange-300'>
        Contact me!
      </h2>
      <div className='my-4 border-[1px] p-10 w-[440px] flex flex-col items-start bg-white rounded-xl'>
        <p className='font-bold mb-4 text-xl '>{userName}</p>
        <p className='text-gray-700 text-md'>
          <b className='text-black text-lg mr-3'>E-mail </b>
          {email}
        </p>
        <p className='text-gray-700 text-md mt-1'>
          <b className='text-black text-lg mr-3'>Phone </b>
          {phoneNum?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
        </p>
        <div className='flex gap-4 mt-8 ml-auto text-gray-800'>
          {github && (
            <a href={github} className='hover:text-point3'>
              <GithubIcon size='8' />
            </a>
          )}
          <button
            aria-label='email'
            onClick={() => copyText(email)}
            className='hover:text-point3'
          >
            <GmailIcon />
          </button>
          {phoneNum && (
            <button
              aria-label='phone'
              onClick={() => copyText(phoneNum)}
              className='hover:text-point3'
            >
              <PhoneIcon />
            </button>
          )}
        </div>
      </div>
      <Wave />
    </section>
  );
}
