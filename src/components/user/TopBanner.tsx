import { FullMember } from '@/service/member';
import GithubOverview from '@/components/user/GithubOverview';

export default function TopBanner({ github, userName, setting }: FullMember) {
  return (
    <section className='w-full bg-base text-center py-32'>
      <div className='max-w-screen-md mx-auto px-12'>
        <h2 className='text-5xl text-center leading-relaxed'>
          <span className='bg-point3 px-2 rounded-lg'>
            Hey, I&apos;m {userName?.split(' ')[0] || '000'}
          </span>
          <br />a frontend developer
        </h2>
        <p className='leading-relaxed whitespace-pre-wrap mt-10'>
          {setting?.subtitle}
        </p>
        {github && <GithubOverview username={github?.split('@')[0]} />}
      </div>
    </section>
  );
}
