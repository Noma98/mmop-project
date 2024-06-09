import Image from 'next/image';
import { getServerSession } from 'next-auth';

import Banner from 'public/image/banner_graphic.png';
import StartLabel from '@/components/home/StartLabel';
import Wave from '@/components/common/Wave';
import authOptions from '@/app/lib/configs/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <section className='bg-gradient-to-r from-[#C9E8F2] to-blue-100 pt-[70px] h-full relative'>
      <div className=' h-full gap-40 mx-auto flex items-center justify-center mt-[-56px]'>
        <div>
          <h1 className='whitespace-pre-wrap font-extrabold text-5xl p-8'>{`m  make\nm  my\no   own\np   portfolio`}</h1>
          <StartLabel user={user} />
        </div>
        <Image
          src={Banner}
          alt='creating page'
          className='w-[400px] h-auto opacity-50 hidden lg:block object-contain'
          priority
        />
        <Wave />
      </div>
    </section>
  );
}
