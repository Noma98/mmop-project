import useSWR from 'swr';

import { FullMember } from '@/service/member';

type Props = {
  userId: string;
};
export default function useUserInfo({ userId }: Props) {
  const { data: userInfo, isLoading } = useSWR<FullMember>(
    `/api/member/${userId}`
  );
  return {
    userInfo,
    isLoading,
  };
}
