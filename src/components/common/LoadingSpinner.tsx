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
  return <PulseLoader color={color} size={size} />;
}
