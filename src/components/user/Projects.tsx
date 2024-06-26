'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import NoContent from 'public/image/no_content.png';
import ProjectCard from '@/components/user/ProjectCard';
import Filter from '@/components/user/Filter';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { NoFilterIcon } from '@/components/icons';
import { FullMember } from '@/service/member';
import useProjects from '@/hooks/useProjects';

export default function Projects({ userId, github, setting }: FullMember) {
  const [activeYear, setActiveYear] = useState('ALL');
  const [activeType, setActiveType] = useState('business');

  const session = useSession();
  const user = session.data?.user;
  const [activeFilter, setActiveFilter] = useState('type');
  const { projects, isLoading } = useProjects({
    activeType,
    activeYear,
    userId,
  });

  const createPageLink = () => `/id/${userId}/create`;

  return (
    <section
      className='px-12 py-32 w-full'
      style={{
        background: `linear-gradient(to right, ${setting?.bgColors?.left}, ${setting?.bgColors?.right})`,
      }}
    >
      <div className='max-w-screen-lg flex flex-col items-center mx-auto'>
        <h2 className='highlight text-4xl md:mb-4 mb-12 bg-point3 px-2 font-semibold border-l-[5px] border-orange-300'>
          {`My ${github ? '{dev}' : ''} Projects`}
        </h2>
        {projects?.length !== 0 && (
          <p className='text-center mt-4 mb-12 text-lg'>
            <span className='font-bold bg-white px-1'>Business</span> is a
            project that I worked for a company, and
            <span className='font-bold bg-white px-1 ml-1'>side</span> is a
            project that I personally did for study purposes.
          </p>
        )}
        {isLoading && <LoadingSpinner />}
        {projects && (
          <div className='flex flex-col gap-12 w-full'>
            {projects?.length === 0 ? (
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
                      : 'No contents...'}
                  </p>
                  {user?.userId === userId && (
                    <Link
                      href={createPageLink()}
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
                {projects?.map((project, idx) => (
                  <ProjectCard key={idx} data={project} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
