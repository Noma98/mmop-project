import Image from 'next/image';

import SearchForm from '@/components/home/SearchForm';
import Wave from '@/components/home/Wave';
import Banner from 'public/image/banner_graphic.png';

export default function TopSection() {
  return (
    <section className='bg-gradient-to-r from-[#C9E8F2] to-blue-100 p-8 h-[530px] relative'>
      <div className='flex justify-center gap-40 max-w-screen-lg mx-auto'>
        <div>
          <h1 className='whitespace-pre-wrap font-extrabold text-5xl p-8'>{`m  make\nm  my\no   own\np   portfolio`}</h1>
          <SearchForm />
        </div>
        <Image
          src={Banner}
          alt='creating page'
          className='w-[400px] h-auto opacity-50 hidden lg:block object-contain'
          priority
        />
      </div>
      <Wave />
    </section>
  );
}
