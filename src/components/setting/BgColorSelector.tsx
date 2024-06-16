'use client';

import React, { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import ColorPicker from '@/components/setting/ColorPicker';

type Props = {
  colors?: {
    left: string;
    right: string;
  };
  setValue: UseFormSetValue<any>;
};

export default function BgColorSelector({ colors, setValue }: Props) {
  const [left, setLeft] = useState(colors?.left);
  const [right, setRight] = useState(colors?.right);

  const onChange = (color: string, direction: 'left' | 'right') => {
    if (direction === 'left') {
      setLeft(color);
    } else {
      setRight(color);
    }
  };
  const onChangeComplete = (color: string, direction: 'left' | 'right') => {
    setValue(`bgColors.${direction}`, color);
  };

  return (
    <div className='w-full flex flex-col'>
      <div
        className={`w-full h-20 rounded-md border-[1px] mb-4`}
        style={{ background: `linear-gradient(to right, ${left}, ${right})` }}
      />
      <div className='flex gap-2 justify-between'>
        <ColorPicker
          onChange={onChange}
          onChangeComplete={onChangeComplete}
          color={left as string}
          direction='left'
        />
        <ColorPicker
          onChange={onChange}
          onChangeComplete={onChangeComplete}
          color={right as string}
          direction='right'
        />
      </div>
    </div>
  );
}
