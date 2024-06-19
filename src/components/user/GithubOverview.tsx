'use client';

import GithubCalendar from 'react-github-calendar';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { InvisibleIcon } from '@/components/icons';
import useCheckValidGithub from '@/hooks/useCheckValidGithub';

type Props = {
  username: string;
};
function GithubOverview({ username }: Props) {
  const { isValid } = useCheckValidGithub({ username });

  return (
    <>
      {isValid === undefined ? (
        <LoadingSpinner />
      ) : isValid === true ? (
        <GithubCalendar
          username={username}
          style={{ marginTop: 68 }}
          colorScheme='light'
        />
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
