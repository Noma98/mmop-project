import React from 'react';
import { PulseLoader } from 'react-spinners';

type Props = {
  color?: string;
  size?: string;
  isPadding?: boolean;
};
export default function LoadingSpinner({
  color = '#4f90c2',
  size = '10px',
  isPadding = true,
}: Props) {
  return (
    <section
      className={`w-full h-full flex justify-center items-center ${
        isPadding ? 'py-40' : ''
      }`}
    >
      <PulseLoader color={color} size={size} />
    </section>
  );
}
