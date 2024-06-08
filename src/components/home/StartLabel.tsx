import React from 'react';
import Link from 'next/link';
import { OAuthMember } from '@/service/member';

type Props = { user?: OAuthMember };
export default function StartLabel({ user }: Props) {
  return (
    <div className='w-[320px] flex ml-4 mt-4'>
      <div className='p-4 flex-1 outline-none bg-white text-gray-400'>
        Let&apos;s start now (・_-)/☼✧
      </div>
      <Link
        href={user ? `/id/${user.userId}` : `/api/auth/signin`}
        className='px-4 font-bold bg-[#161C1E] text-white flex items-center'
      >{`-->`}</Link>
    </div>
  );
}
