import Image from 'next/image';
import Link from 'next/link';

import LogoImg from 'public/image/logo.png';

export default function Footer() {
  return (
    <footer className='w-full flex justify-center items-center p-8 gap-4 absolute bottom-0'>
      <Link href='/'>
        <Image
          alt='logo'
          src={LogoImg}
          width={90}
          height={52}
          className='object-contain'
        />
      </Link>
      <p className='text-sm text-neutral-600'>
        Copyright © 2024 Noma. All rights Reserved
      </p>
    </footer>
  );
}
