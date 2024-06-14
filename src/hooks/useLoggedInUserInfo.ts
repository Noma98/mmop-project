import useSWR from 'swr';
import { useSession } from 'next-auth/react';

import { FullMember, OAuthMember } from '@/service/member';

export default function useLoggedInUserInfo() {
  const { data: session } = useSession();
  const user = session?.user as OAuthMember;
  const { data, isLoading } = useSWR<FullMember>(`/api/member/${user?.userId}`);

  return { userId: user.userId, data, isLoading };
}
