import React from 'react';

import { FullMember } from '@/service/member';
import Wave from '@/components/home/Wave';
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
    <section className='w-full h-80 flex flex-col items-center py-40 pb-[500px] bg-[#81b2ef]'>
      <h2 className='highlight font-bold text-4xl mb-4 highlight-yellow'>
        Contact me!
      </h2>
      <div className='my-4 border-[1px] p-10 w-[400px] flex flex-col items-start bg-white rounded-xl'>
        <p className='font-bold mb-4 '>{userName}</p>
        <p className='text-gray-700 text-sm'>
          <b className='text-black text-md mr-3'>E-mail </b>
          {email}
        </p>
        <p className='text-gray-700 text-sm mt-1'>
          <b className='text-black text-md mr-3'>Phone </b>
          {phoneNum?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
        </p>
        <div className='flex gap-4 mt-8 ml-auto text-gray-800'>
          {github && (
            <a href={github}>
              <GithubIcon size='8' />
            </a>
          )}
          <button onClick={() => copyText(email)}>
            <GmailIcon />
          </button>
          {phoneNum && (
            <button onClick={() => copyText(phoneNum)}>
              <PhoneIcon />
            </button>
          )}
        </div>
      </div>
      <Wave />
    </section>
  );
}
