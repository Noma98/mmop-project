import { CalendarIcon } from '@/components/icons';

type Props = {
  startDate: string;
  endDate: string;
};
export default function Period({ startDate, endDate }: Props) {
  return (
    <div className='flex gap-2 text-neutral-500 text-sm'>
      <div className='flex gap-2 items-center'>
        <CalendarIcon />
        <time>{startDate.slice(0, 7)}</time>
      </div>
      ~
      <div className='flex gap-2 items-center'>
        <CalendarIcon />
        <time>{endDate.slice(0, 7)}</time>
      </div>
    </div>
  );
}
