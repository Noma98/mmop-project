'use client';

import { MutableRefObject } from 'react';
import { ChevronUpIcon } from '@/components/icons';

type Props = {
  screenRef: MutableRefObject<HTMLDivElement>;
};
export default function ScrollUp({ screenRef }: Props) {
  const onClick = () => {
    screenRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex justify-center items-center bg-black/70 text-white hover:opacity-50 z-20 transition-all duration-500`}
    >
      <ChevronUpIcon />
    </button>
  );
}
