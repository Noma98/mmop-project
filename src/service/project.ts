import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client, urlFor } from './sanity';

export type Project = {
  title: string;
  authorId: string;
  startDate: string;
  endDate: string;
  skills: string[];
  description: string;
  type: 'business' | 'side';
  images: string[];
  webLink: string;
  storeLink: string;
  githubLink: string;
  achievements: Array<{ value: string }>;
};
export const getProjects = async (userId: string) => {
  const data = await client.fetch(`*[_type=="project"&&authorId=="${userId}"]`);
  return data.map((item: Project & { images: SanityImageSource[] }) => ({
    ...item,
    images: item.images.map((imgObj: SanityImageSource) => urlFor(imgObj)),
  }));
};
