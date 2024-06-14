'use client';

import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import LogoImg from 'public/image/logo.png';
import useUserInfoByCurrentUrl from '@/hooks/useUserInfoByCurrentUrl';

export default function Header() {
  const router = useRouter();
  const { session, userId, data } = useUserInfoByCurrentUrl();

  const onSignIn = () => {
    signIn();
  };
  const onSignOut = () => {
    signOut();
  };
  const onNavigatePortfolio = () => {
    if (!session) return;
    router.push(`/id/${session.user.userId}`);
  };

  return (
    <header className='px-8 w-full h-[70px] shadow-md bg-white/90 fixed flex justify-between items-center z-20'>
      <div className='flex items-center gap-4'>
        {data ? (
          <Link
            href={`/id/${userId}`}
            className='cursor-pointer flex items-center gap-2'
          >
            {data.setting?.logo && (
              <Image
                alt='logo'
                src={data.setting.logo}
                width={28}
                height={28}
                className='object-contain'
                priority
              />
            )}
            <h1 className='font-extrabold text-xl'>
              {data.setting?.title ||
                (!data.setting?.logo && `${userId}'s portfolio`)}
            </h1>
          </Link>
        ) : (
          <Link href='/'>
            <Image
              alt='logo'
              src={LogoImg}
              width={100}
              height={52}
              className='object-contain'
            />
          </Link>
        )}
      </div>
      <div className='flex items-center'>
        {session && !userId && (
          <button
            className='mr-8 border-b-[1px] pb-1'
            onClick={onNavigatePortfolio}
          >{`My portfolio ->`}</button>
        )}
        {!userId && (
          <button
            onClick={session ? onSignOut : onSignIn}
            className='border-[1px] py-2 px-4 font-bold rounded-md active:bg-neutral-50'
          >
            {session ? 'Sign out' : 'Sign in'}
          </button>
        )}
        {session && !userId && (
          <Image
            alt='profile'
            src={session?.user?.image as string}
            width={40}
            height={40}
            className='ml-4 rounded-full'
          />
        )}
        {session?.user?.userId === userId && (
          <Link
            href={`/id/${session?.user?.userId}/setting`}
            className='border-[1px] py-2 px-4 font-bold rounded-full hover:bg-black hover:text-white'
          >
            Setting
          </Link>
        )}
      </div>
    </header>
  );
}
