import { AlertIcon } from '@/components/icons';

type Props = {
  message: string;
};

export default function FieldError({ message }: Props) {
  return (
    <div className='flex gap-2 text-red-500 mb-2'>
      <AlertIcon />
      <p className='text-sm font-semibold'>{message}</p>
    </div>
  );
}
