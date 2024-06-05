'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { FullMember, OAuthMember } from '@/service/member';
import PortfolioInfoForm from '@/components/setting/PortfolioInfoForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import UserInfoForm from '@/components/setting/UserInfoForm';

export default function SettingPage() {
  const { data: session } = useSession();
  const user = session?.user as OAuthMember;
  const { data, isLoading } = useSWR<FullMember>(`/api/member/${user?.userId}`);

  const linkStyle =
    'py-4 border-[1px] rounded-md flex-1 block bg-white font-bold text-center border-black';
  return (
    <section className='bg-slate-50 flex flex-col items-center p-12'>
      <div className='flex gap-4 w-full max-w-[660px]'>
        <Link
          href={`/id/${user?.userId}/create`}
          className={`${linkStyle} bg-black text-white`}
        >
          + Register New Project
        </Link>
        <Link
          href={`/id/${user?.userId}/edit`}
          className={`${linkStyle} text-gray-800 `}
        >
          Modify Existing Projects
        </Link>
      </div>
      {isLoading && <LoadingSpinner />}
      {data && <PortfolioInfoForm data={data.setting} userId={user.userId} />}
      {data && <UserInfoForm data={data} userId={user.userId} />}
    </section>
  );
}
