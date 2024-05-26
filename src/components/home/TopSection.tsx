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
          alt='make_page'
          width={400}
          className='opacity-50 hidden lg:block'
        />
      </div>
      <Wave />
    </section>
  );
}
