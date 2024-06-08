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
    title,
    description: subtitle,
    icons: {
      icon: logo,
    },
  };
}
export default function UserPage({ params: { userId } }: Props) {
  return <Contents userId={userId} />;
}
