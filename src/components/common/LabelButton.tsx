import React, { ReactNode } from 'react';

type Props = {
  text: string;
  icon?: ReactNode;
  style?: string;
  onClick: () => void;
};

export default function LabelButton({
  text,
  icon,
  style = '',
  onClick,
}: Props) {
  return (
    <button
      className={`py-2 px-4 bg-neutral-800 text-white font-bold rounded-full flex gap-1 ${style}`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
