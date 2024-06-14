'use client';

import React from 'react';
import Link from 'next/link';

import PortfolioInfoForm from '@/components/setting/PortfolioInfoForm';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import UserInfoForm from '@/components/setting/UserInfoForm';
import useLoggedInUserInfo from '@/hooks/useLoggedInUserInfo';

export default function SettingPage() {
  const { userId, data, isLoading } = useLoggedInUserInfo();

  const linkStyle =
    'py-4 border-[1px] rounded-md flex-1 block bg-white font-bold text-center border-black';
  return (
    <section className='bg-slate-50 flex flex-col items-center p-12 pt-[120px]'>
      <div className='flex gap-4 w-full max-w-[660px]'>
        <Link
          href={`/id/${userId}/create`}
          className={`${linkStyle} text-white`}
          style={{ backgroundColor: 'black' }}
        >
          + Register New Project
        </Link>
        <Link
          href={`/id/${userId}/edit`}
          className={`${linkStyle} text-gray-800 `}
        >
          Modify Existing Projects
        </Link>
      </div>
      {isLoading && <LoadingSpinner />}
      {data && <PortfolioInfoForm data={data.setting} userId={userId} />}
      {data && <UserInfoForm data={data} userId={userId} />}
    </section>
  );
}
