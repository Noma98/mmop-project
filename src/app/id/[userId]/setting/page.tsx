import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import authOptions from '@/app/lib/configs/auth';
import { OAuthMember } from '@/service/member';

export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  const { userId } = session?.user as OAuthMember;
  const linkStyle =
    'py-4 px-8 border-[1px] rounded-md  w-80 bg-white font-bold text-center border-black';
  return (
    <section className='h-[640px] bg-slate-50 flex justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <Link
          href={`/id/${userId}/create`}
          className={`${linkStyle} text-gray-800`}
        >
          Register New Project
        </Link>
        <Link
          href={`/id/${userId}/edit`}
          className={`${linkStyle} bg-black text-white`}
        >
          Edit Portfolio
        </Link>
      </div>
    </section>
  );
}
