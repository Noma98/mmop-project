'use client';

import { FullMember } from '@/service/member';
import AboutMe from '@/components/user/AboutMe';
import Projects from '@/components/user/Projects';
import TopBanner from '@/components/user/TopBanner';
import ContactMe from '@/components/user/ContactMe';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useUserInfo from '@/hooks/useUserInfo';

type Props = {
  userId: string;
};
export default function Contents({ userId }: Props) {
  const { userInfo, isLoading } = useUserInfo({ userId });

  return (
    <section
      className={`relative flex flex-col justify-center items-center pt-[70px]`}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <TopBanner {...(userInfo as FullMember)} />
          <AboutMe {...(userInfo as FullMember)} />
          <Projects {...(userInfo as FullMember)} />
          <ContactMe {...(userInfo as FullMember)} />
        </>
      )}
    </section>
  );
}
