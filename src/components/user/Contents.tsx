'use client';

import useSWR from 'swr';

import { FullMember } from '@/service/member';
import AboutMe from '@/components/user/AboutMe';
import Projects from '@/components/user/Projects';
import TopBanner from '@/components/user/TopBanner';
import ContactMe from '@/components/user/ContactMe';

type Props = {
  userId: string;
};
export default function Contents({ userId }: Props) {
  const { data: userInfo } = useSWR<FullMember>(`/api/member/${userId}`);

  return (
    <section
      className={`relative flex flex-col justify-center items-center pt-[70px]`}
    >
      <TopBanner {...(userInfo as FullMember)} />
      <AboutMe {...(userInfo as FullMember)} />
      <Projects {...(userInfo as FullMember)} />
      <ContactMe {...(userInfo as FullMember)} />
    </section>
  );
}
