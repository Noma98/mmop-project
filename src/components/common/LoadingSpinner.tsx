import React from 'react';
import { PulseLoader } from 'react-spinners';

type Props = {
  color?: string;
  size?: string;
};
export default function LoadingSpinner({
  color = '#4f90c2',
  size = '10px',
}: Props) {
  return (
    <section className='w-full h-full flex justify-center items-center py-40'>
      <PulseLoader color={color} size={size} />
    </section>
  );
}
