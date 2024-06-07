'use client';

import React, { MouseEvent, Dispatch, SetStateAction } from 'react';

import Label from '@/components/common/Label';
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
    <section className='flex flex-col items-start z-10'>
      <div className='flex'>
        <Label
          text=''
          style='rounded-none rounded-t-md bg-black'
          icon={<FilterIcon />}
        />
        <button
          className={`py-2 px-4 bg-neutral-800 text-white font-bold flex gap-1 rounded-none rounded-t-md`}
          style={{
            color: activeFilter === 'year' ? 'black' : 'gray',
            backgroundColor:
              activeFilter === 'year' ? 'white' : 'rgb(229 229 229)',
          }}
          onClick={() => setActiveFilter('year')}
        >
          Year
        </button>
        <button
          className={`py-2 px-4 bg-neutral-800 text-white font-bold flex gap-1 rounded-none rounded-t-md`}
          style={{
            color: activeFilter === 'type' ? 'black' : 'gray',
            backgroundColor:
              activeFilter === 'type' ? 'white' : 'rgb(229 229 229)',
          }}
          onClick={() => setActiveFilter('type')}
        >
          Type
        </button>
      </div>
      <div className='flex gap-2 rounded-r-xl rounded-b-xl bg-white p-6 min-w-[372px]'>
        {activeFilter === 'year'
          ? yearData.map((year, idx) => (
              <button
                key={idx}
                className={`py-1 px-3 border-[1px] border-neutral-300 rounded-full hover:bg-point1 text-sm font-semibold ${
                  activeYear == year
                    ? 'bg-point3 text-white font-bold border-none'
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
                className={`py-1 px-3 border-[1px] border-neutral-300 rounded-full hover:bg-point1 text-sm font-semibold capitalize ${
                  activeType === type
                    ? 'bg-point3 text-white font-bold border-none'
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
