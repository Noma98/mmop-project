'use client';

import Link from 'next/link';

import ProjectEditCard from '@/components/edit/ProjectEditCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useProjectDetail from '@/hooks/useProjectDetail';

type Props = {
  params: {
    userId: string;
  };
};
export default function EditPage({ params: { userId } }: Props) {
  const { projects, isLoading } = useProjectDetail({ userId });

  return (
    <section className='bg-gradient-to-r from-[#C9E8F2] to-blue-100 pb-20 relative pt-[70px] min-h-screen overflow-scroll'>
      <div className='max-w-screen-lg mx-auto'>
        {isLoading && <LoadingSpinner />}
        {projects && (
          <>
            <div className='flex flex-col gap-4 p-4 '>
              {projects.map((project, idx) => (
                <ProjectEditCard key={idx} data={project} />
              ))}
            </div>
            {projects.length === 0 && (
              <div className='flex flex-col items-center p-32'>
                <p className='text-lg text-gray-700'>
                  There&apos;s no content to edit.
                </p>
                <Link
                  href={`/id/${userId}`}
                  className='mt-8 inline-block py-4 px-8 bg-blue-600 text-white font-bold rounded-md'
                >{`Go back ->`}</Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
