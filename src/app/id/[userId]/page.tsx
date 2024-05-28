import Image from 'next/image';
import Link from 'next/link';

import NoContent from 'public/image/no_content.png';
import { getProjects, Project } from '@/service/project';
import ProjectCard from '@/components/user/ProjectCard';
import Wave from '@/components/home/Wave';

type Props = {
  params: {
    userId: string;
  };
};
export default async function UserPage({ params: { userId } }: Props) {
  const projects = (await getProjects(userId)) as Project[];

  return (
    <section className='bg-gradient-to-r from-[#C9E8F2] to-blue-100 pb-20 relative pt-10'>
      <div className='flex flex-col gap-4 p-4 '>
        {projects?.length === 0 ? (
          <div className='text-neutral-500 py-20 w-full inline-block whitespace-pre-wrap text-center text-lg flex-col items-center'>
            <Image
              src={NoContent}
              alt='no content'
              width={500}
              height={500}
              className='mx-auto'
            />
            <p>{`You don't have any contents.\nRegister your first project!`}</p>
            <Link
              href={`/id/${userId}/edit`}
              className='mt-8 inline-block py-4 px-8 bg-blue-600 text-white font-bold rounded-md'
            >{`Start now ->`}</Link>
          </div>
        ) : (
          <>
            {projects.map((project, idx) => (
              <ProjectCard key={idx} data={project} />
            ))}
          </>
        )}
      </div>
      <Wave />
    </section>
  );
}
