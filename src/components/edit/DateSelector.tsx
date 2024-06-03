'use client';

import { MouseEventHandler, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { UseFormSetValue } from 'react-hook-form';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

import { CalendarIcon } from '@/components/icons';
type Props = {
  period: {
    startDate: string | Date;
    endDate: string | Date;
  };
  updateInputData: UseFormSetValue<any>;
};
function DateSelector({ period, updateInputData }: Props) {
  const [date, setDate] = useState({
    startDate: period.startDate,
    endDate: period.endDate,
  });
  const { startDate, endDate } = date;
  const [isActiveCalendar, setIsActiveCalendar] = useState(false);

  const onClickDateSelector: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsActiveCalendar(true);
  };
  const onChange = (e: any) => {
    const { startDate, endDate } = e.selection;
    setDate({ startDate, endDate });
  };
  const onApply = (e: any) => {
    updateInputData('startDate', startDate);
    updateInputData('endDate', endDate);
    onCloseCalendar(e);
  };
  const onCancel = (e: any) => {
    setDate({
      startDate: period.startDate,
      endDate: period.endDate,
    });
    onCloseCalendar(e);
  };
  const onCloseCalendar = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsActiveCalendar(false);
    }
  };

  return (
    <>
      <button
        className='flex items-center gap-2 border-[1px] p-2 px-4 rounded-md'
        onClick={onClickDateSelector}
      >
        <CalendarIcon />
        {`${format(new Date(period.startDate), 'yyyy-MM-dd ~ ')}${format(
          new Date(period.endDate),
          'yyyy-MM-dd'
        )}`}
      </button>
      {isActiveCalendar && (
        <div
          onClick={onCloseCalendar}
          className='bg-black/20 fixed top-0 left-0 w-full h-full flex justify-center items-center z-10'
        >
          <div className='flex flex-col bg-white rounded-xl p-4'>
            <DateRangePicker
              ranges={[
                {
                  startDate: new Date(startDate),
                  endDate: new Date(endDate),
                  key: 'selection',
                },
              ]}
              onChange={onChange}
              months={2}
              direction='horizontal'
              staticRanges={[]}
              inputRanges={[]}
            />
            <div className='flex gap-4 ml-auto'>
              <button
                className='bg-white p-2 w-32 border-[1px] text-neutral-500 rounded-lg'
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                onClick={onApply}
                className='bg-red-500 text-white font-bold p-2 w-32 border-[1px] rounded-lg'
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DateSelector;
