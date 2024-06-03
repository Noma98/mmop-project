import Label from '@/components/common/Label';
import {
  BusinessIcon,
  GameIcon,
  GithubIcon,
  StoreIcon,
  WebIcon,
} from '@/components/icons';
import IconLink from '@/components/user/IconLink';
import Period from '@/components/user/Period';
import { Project } from '@/service/project';

type Props = {
  data: Project;
};
export default function ProjectCard({ data }: Props) {
  const {
    title,
    description,
    images,
    webLink,
    githubLink,
    storeLink,
    achievements,
    skills,
    startDate,
    endDate,
    type,
  } = data;
  const linkData = [
    { text: 'Web Link', link: webLink, color: 'red-500', icon: <WebIcon /> },
    {
      text: 'Store Link',
      link: storeLink,
      color: '[#1C95F1]',
      icon: <StoreIcon />,
    },
    { text: 'Github Link', link: githubLink, icon: <GithubIcon /> },
  ];
  return (
    <article className='flex flex-col lg:flex-row p-10 round relative rounded-xl gap-10 m-8 shadow-md border-[1px] border-neutral-200 bg-white z-10'>
      <Label
        text={type}
        icon={type === 'business' ? <BusinessIcon /> : <GameIcon />}
        style='absolute top-[-20px] left-[20px]'
      />
      <div className={`flex flex-col gap-2 lg:hidden`}>
        <Period startDate={startDate} endDate={endDate} />
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p>{description}</p>
      </div>
      <div className='flex flex-col gap-2 flex-1'>
        <div className={`hidden flex-col gap-2 lg:flex`}>
          <Period startDate={startDate} endDate={endDate} />
          <h2 className='text-2xl font-bold'>{title}</h2>
          <p>{description}</p>
        </div>
        <ul>
          {achievements.map((item, idx) => (
            <li
              className='list-square translate-x-4 text-neutral-700'
              key={idx}
            >
              {item.value}
            </li>
          ))}
        </ul>
        <div className='flex flex-wrap gap-2 items-center border-t-[1px] pt-4 mt-4'>
          {linkData.map(
            (data, idx) => data.link && <IconLink key={idx} {...data} />
          )}
        </div>
        <div className='flex gap-2 flex-wrap'>
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className='py-1 px-2 rounded-lg text-sm bg-neutral-500 text-white font-bold'
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
