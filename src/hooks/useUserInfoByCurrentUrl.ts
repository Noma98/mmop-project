import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { FullMember } from '@/service/member';

export default function useUserInfoByCurrentUrl() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState('');
  const pathname = usePathname();

  const { data } = useSWR<FullMember>(userId ? `/api/member/${userId}` : null);

  useEffect(() => {
    setUserId(pathname === '/' ? '' : pathname.slice(4).split('/')[0]);
  }, [pathname]);

  return { session, userId, data };
}
