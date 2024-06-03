import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client, urlFor } from './sanity';

export type Project = {
  id: string;
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
export type RawProject = Omit<Project, 'id'> & {
  images: SanityImageSource[];
  _id: string;
};
export const getProjects = async (userId: string) => {
  const data = await client.fetch(
    `*[_type=="project"&&authorId=="${userId}"]|order("endDate" desc)`
  );
  return data.map((item: RawProject) => ({
    ...item,
    id: item._id,
    images: item.images.map((imgObj: SanityImageSource) => urlFor(imgObj)),
  }));
};
