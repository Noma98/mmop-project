'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import NoContent from 'public/image/no_content.png';
import { Project } from '@/service/project';
import ProjectCard from '@/components/user/ProjectCard';
import Wave from '@/components/home/Wave';
import LoadingSpinner from '@/components/common/LoadingSpinner';

type Props = {
  params: {
    userId: string;
  };
};
export default function UserPage({ params: { userId } }: Props) {
  const { data: projects, isLoading } = useSWR<Project[]>(
    `/api/project/${userId}`
  );
  const session = useSession();
  const user = session.data?.user;

  return (
    <section className='bg-gradient-to-r from-[#C9E8F2] to-blue-100 pb-20 relative pt-10 px-16 min-h-[680px] flex justify-center items-center'>
      {isLoading && <LoadingSpinner />}
      {projects && (
        <div className='flex flex-col gap-12 w-full'>
          {projects?.length === 0 ? (
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
