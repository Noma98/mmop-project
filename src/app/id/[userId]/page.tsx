'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import NoContent from 'public/image/no_content.png';
import { Project } from '@/service/project';
import ProjectCard from '@/components/user/ProjectCard';
import Filter from '@/components/user/Filter';
import Wave from '@/components/home/Wave';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { NoFilterIcon } from '@/components/icons';
import { FullMember } from '@/service/member';

type Props = {
  params: {
    userId: string;
  };
};
export default function UserPage({ params: { userId } }: Props) {
  const [activeYear, setActiveYear] = useState('ALL');
  const [activeType, setActiveType] = useState('ALL');
  const [activeFilter, setActiveFilter] = useState('year');

  const { data: userInfo } = useSWR<FullMember>(`/api/member/${userId}`);
  const {
    data: projects,
    isLoading,
    mutate,
  } = useSWR<Project[]>(
    `/api/project/${userId}?year=${activeYear}&type=${activeType}`
  );
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    mutate();
  }, [activeType, activeYear]);

  return (
    <section
      style={{
        background: `linear-gradient(to right, ${
          userInfo?.setting?.bgColors?.left || '#DCEFF5'
        }, ${userInfo?.setting?.bgColors?.right || '#DCE5FD'})`,
      }}
      className={`pb-20 relative pt-10 px-16 min-h-[680px] flex justify-center items-center`}
    >
      {isLoading && <LoadingSpinner />}
      {projects && (
        <div className='flex flex-col gap-12 w-full'>
          {projects.length === 0 ? (
            activeType === 'ALL' && activeYear === 'ALL' ? (
              <div className='text-neutral-500 pb-12 w-full inline-block whitespace-pre-wrap text-center text-lg flex-col items-center'>
                <Image
                  src={NoContent}
                  alt='no content'
                  width={500}
                  height={500}
                  className='mx-auto'
                />
                <p>
                  {user?.userId === userId
                    ? `You don't have any contents.\nRegister your first project!`
                    : 'No contents'}
                </p>
                {user?.userId === userId && (
                  <Link
                    href={`/id/${userId}/create`}
                    className='mt-8 inline-block py-4 px-8 bg-blue-600 text-white font-bold rounded-md'
                  >{`Start now ->`}</Link>
                )}
              </div>
            ) : (
              <>
                <Filter
                  activeType={activeType}
                  activeYear={activeYear}
                  setActiveType={setActiveType}
                  setActiveYear={setActiveYear}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                />
                <div className='flex flex-col items-center justify-center text-lg bg-white/50 rounded-xl py-32 text-gray-700'>
                  <NoFilterIcon />
                  <p>No results with that filter.</p>
                </div>
              </>
            )
          ) : (
            <>
              <Filter
                activeType={activeType}
                activeYear={activeYear}
                setActiveType={setActiveType}
                setActiveYear={setActiveYear}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
              />
              {projects.map((project, idx) => (
                <ProjectCard key={idx} data={project} />
              ))}
            </>
          )}
        </div>
      )}
      <Wave />
    </section>
  );
}
