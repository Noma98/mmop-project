import { Metadata } from 'next';

import Contents from '@/components/user/Contents';
import { FullMember } from '@/service/member';

type Props = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Props): Promise<Metadata> {
  const userInfo = await fetch(
    `${process.env.NEXTAUTH_URL}/api/member/${userId}`,
    {
      method: 'GET',
    }
  );
  const {
    setting: { title, subtitle, logo },
  } = (await userInfo.json()) as FullMember;

  return {
    title: title || `${userId}'s portfolio`,
    description: subtitle || `${userId}'s portfolio`,
    icons: {
      icon: logo || '/image/m_logo.png',
    },
  };
}
export default function UserPage({ params: { userId } }: Props) {
  return <Contents userId={userId} />;
}
