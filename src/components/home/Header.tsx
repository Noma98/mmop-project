'use client';

import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import LogoImg from 'public/image/logo.png';

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const onSignIn = () => {
    signIn();
  };
  const onSignOut = () => {
    signOut();
  };
  const onNavigatePortfolio = () => {
    if (!session) return;
    router.push(`/${session.user.userId}`);
  };
  return (
    <header className='px-8 w-full h-[70px] shadow-md bg-white/90 fixed flex justify-between items-center'>
      <Image alt='logo' src={LogoImg} width={80} height={36} />
      <div className='flex items-center'>
        {session && (
          <button
            className='mr-8 border-b-[1px] pb-1'
            onClick={onNavigatePortfolio}
          >{`My portfolio ->`}</button>
        )}
        <button
          onClick={session ? onSignOut : onSignIn}
          className='border-[1px] py-2 px-4 font-bold rounded-md active:bg-neutral-50'
        >
          {session ? 'Sign out' : 'Sign in'}
        </button>
        {session && (
          <Image
            alt='profile'
            src={session?.user?.image as string}
            width={40}
            height={40}
            className='ml-4 rounded-full'
          />
        )}
      </div>
    </header>
  );
}
