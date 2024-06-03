'use client';

import React, { MouseEvent, Dispatch, SetStateAction } from 'react';

import Label from '@/components/common/Label';
import LabelButton from '@/components/common/LabelButton';
import { FilterIcon } from '@/components/icons';
import { getLatestYearArray } from '@/utils/filter';

type Props = {
  activeYear: string;
  activeType: string;
  activeFilter: string;
  setActiveYear: Dispatch<SetStateAction<string>>;
  setActiveType: Dispatch<SetStateAction<string>>;
  setActiveFilter: Dispatch<SetStateAction<string>>;
};
export default function Filter({
  activeYear,
  activeType,
  setActiveYear,
  setActiveType,
  activeFilter,
  setActiveFilter,
}: Props) {
  const yearData = ['ALL', ...getLatestYearArray()];
  const typeData = ['ALL', 'business', 'side'];

  const onClickBtn = (
    e: MouseEvent<HTMLButtonElement>,
    filterType: 'type' | 'year'
  ) => {
    const target = e.target as HTMLButtonElement;
    if (filterType === 'type') {
      setActiveType(target.textContent as string);
    } else {
      setActiveYear(target.textContent as string);
    }
  };

  return (
    <section className='flex flex-col items-start p-4 z-10'>
      <div className='flex'>
        <Label
          text=''
          style='rounded-none rounded-t-md bg-neutral-800'
          icon={<FilterIcon />}
        />
        <LabelButton
          text='Year'
          style={`rounded-none rounded-t-md ${
            activeFilter === 'year'
              ? 'bg-white/70 text-gray-800'
              : 'bg-[#99d6ea9d] text-white'
          }`}
          onClick={() => setActiveFilter('year')}
        />
        <LabelButton
          text='Type'
          style={`rounded-none rounded-t-md ${
            activeFilter === 'type'
              ? 'bg-white/70 text-gray-800'
              : 'bg-[#99d6ea9d] text-white'
          }`}
          onClick={() => setActiveFilter('type')}
        />
      </div>
      <div className='flex gap-2 rounded-r-xl rounded-b-xl bg-white/70 p-6 shadow-sm'>
        {activeFilter === 'year'
          ? yearData.map((year, idx) => (
              <button
                key={idx}
                className={`py-1 px-3 border-[1px] border-neutral-300 rounded-full hover:opacity-50 text-sm font-semibold ${
                  activeYear == year
                    ? 'bg-cyan-500 text-white font-bold border-none'
                    : 'bg-white'
                }`}
                onClick={(e) => onClickBtn(e, 'year')}
              >
                {year}
              </button>
            ))
          : typeData.map((type, idx) => (
              <button
                key={idx}
                className={`py-1 px-3 border-[1px] border-neutral-300 rounded-full hover:opacity-50 text-sm font-semibold capitalize ${
                  activeType === type
                    ? 'bg-cyan-500 text-white font-bold border-none'
                    : 'bg-white'
                }`}
                onClick={(e) => onClickBtn(e, 'type')}
              >
                {type}
              </button>
            ))}
      </div>
    </section>
  );
}
