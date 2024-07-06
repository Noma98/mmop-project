'use client';

import GithubCalendar from 'react-github-calendar';
import Image from 'next/image';

import { InvisibleIcon } from '@/components/icons';
import useCheckValidGithub from '@/hooks/useCheckValidGithub';
import Glimmer from 'public/image/github_glimmer.png';

type Props = {
  username: string;
};
function GithubOverview({ username }: Props) {
  const { isValid } = useCheckValidGithub({ username });

  return (
    <>
      {isValid === undefined ? (
        <Image
          src={Glimmer}
          alt='github glimmer'
          width={634}
          height={130}
          className='mx-auto mt-[58px] w-[90%] animate-pulse'
        />
      ) : isValid === true ? (
        <a href={`https://github.com/${username}`} target='blank'>
          <GithubCalendar
            username={username}
            style={{ width: '90%', margin: '0 auto', marginTop: 60 }}
            colorScheme='light'
          />
        </a>
      ) : (
        <div className='p-12 bg-white/80 rounded-xl mt-8 flex flex-col items-center text-neutral-500'>
          <h3 className='text-lg font-bold mb-4 text-black'>
            Github Contribution
          </h3>
          <InvisibleIcon />
          <p className='mt-2 test-sm'>This user is invalid or private.</p>
        </div>
      )}
    </>
  );
}

export default GithubOverview;
