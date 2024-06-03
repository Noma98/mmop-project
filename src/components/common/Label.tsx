import React, { ReactNode } from 'react';

type Props = {
  text: string;
  icon?: ReactNode;
  style?: string;
};
export default function Label({ text, icon, style = '' }: Props) {
  return (
    <div
      className={`py-2 px-4 text-white font-bold rounded-full items-center flex gap-1 ${style}`}
    >
      {icon}
      {text}
    </div>
  );
}
