import React, { ReactNode } from 'react';

type Props = {
  text: string;
  link: string;
  icon?: ReactNode;
  style?: string;
};

export default function IconLink({ text, link, icon, style }: Props) {
  return (
    <a
      href={link}
      target='_blank'
      className={`whitespace-nowrap py-2 px-4 rounded-2xl text-white font-bold flex gap-2 items-center ${style}`}
    >
      {icon}
      {text}
    </a>
  );
}
