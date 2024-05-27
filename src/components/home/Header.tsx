'use client';

import useSWR from 'swr';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LogoImg from 'public/image/logo.png';
import { FullMember } from '@/service/member';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const pathname = usePathname();
  const [userId, setUserId] = useState('');
  const { data } = useSWR<FullMember>(userId ? `/api/member/${userId}` : null);

  useEffect(() => {
    setUserId(pathname === '/' ? '' : pathname.slice(4));
  }, [pathname]);

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
    <header className='px-8 w-full h-[70px] shadow-md bg-white/90 fixed flex justify-between items-center'>
      <div className='flex items-center gap-4'>
        {data ? (
          <>
            {data.setting.logo && (
              <Image
                alt='logo'
                src={data.setting.logo}
                width={80}
                height={36}
                priority
              />
            )}
            <h1 className='font-bold text-lg'>
              {data.setting.title ||
                (!data.setting.logo && `${userId}'s portfolio`)}
            </h1>
          </>
        ) : (
          <Image alt='logo' src={LogoImg} width={80} height={36} />
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
            href={`/id/${userId}/edit`}
            className='border-[1px] py-2 px-4 font-bold rounded-md active:bg-neutral-50'
          >
            Edit Portfolio
          </Link>
        )}
      </div>
    </header>
  );
}
