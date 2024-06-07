'use client';

import useSWR from 'swr';

import { FullMember } from '@/service/member';
import AboutMe from '@/components/user/AboutMe';
import Projects from '@/components/user/Projects';
import TopBanner from '@/components/user/TopBanner';
import ContactMe from '@/components/user/ContactMe';

type Props = {
  params: {
    userId: string;
  };
};
export default function UserPage({ params: { userId } }: Props) {
  const { data: userInfo } = useSWR<FullMember>(`/api/member/${userId}`);
  return (
    <section
      style={{
        background: `linear-gradient(to right, ${
          userInfo?.setting?.bgColors?.left || '#DCEFF5'
        }, ${userInfo?.setting?.bgColors?.right || '#DCE5FD'})`,
      }}
      className={`pb-20 relative pt-10 px-16 min-h-[680px] flex justify-center items-center`}
    >
      <TopBanner {...(userInfo as FullMember)} />
      <AboutMe {...(userInfo as FullMember)} />
      <Projects github={userInfo?.github} userId={userId} />
      <ContactMe {...(userInfo as FullMember)} />
    </section>
  );
}
