import ProjectEditCard from '@/components/edit/ProjectEditCard';

export default function CreatePage() {
  const initData = {
    id: '',
    title: '',
    description: '',
    images: [],
    webLink: '',
    githubLink: '',
    storeLink: '',
    achievements: [{ value: '' }],
    skills: [],
    startDate: new Date().toString(),
    endDate: new Date().toString(),
    type: 'business' as 'business' | 'side',
    authorId: '',
  };
  return (
    <section className='max-w-screen-lg mx-auto pt-[70px] w-full'>
      <ProjectEditCard data={initData} />
    </section>
  );
}
