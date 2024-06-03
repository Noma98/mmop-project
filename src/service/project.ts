import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client, extractAssetIdFromUrl, urlFor } from '@/service/sanity';

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
type ProjectFormData = {
  data: Omit<Project, 'images'> & { imageUrls: string[] };
  files: FormDataEntryValue[];
};
export const createProjects = async ({
  data: {
    achievements,
    authorId,
    description,
    endDate,
    githubLink,
    id,
    skills,
    startDate,
    storeLink,
    title,
    type,
    webLink,
  },
  files,
}: ProjectFormData) => {
  const imageAssets = await Promise.all(
    files.map((file) => client.assets.upload('image', file))
  );
  const imageAssetIds = imageAssets.map((imageAsset) => imageAsset._id);
  return client.create({
    _type: 'project',
    title,
    description,
    achievements: achievements.map((item) => ({ ...item, _key: nanoid() })),
    skills,
    githubLink,
    webLink,
    storeLink,
    images: imageAssetIds.map((id) => ({
      _key: nanoid(),
      asset: { _ref: id },
    })),
    startDate: format(new Date(startDate), 'yyyy-MM-dd'),
    endDate: format(new Date(endDate), 'yyyy-MM-dd'),
    type,
    authorId,
  });
};
export const updateProject = async ({
  data: {
    achievements,
    authorId,
    description,
    endDate,
    githubLink,
    id,
    skills,
    startDate,
    storeLink,
    title,
    type,
    webLink,
    imageUrls,
  },
  files,
}: ProjectFormData) => {
  const imageAssets = await Promise.all(
    files.map((file) => client.assets.upload('image', file))
  );
  const existingImgArr = imageUrls.map((url) => {
    const assetId = extractAssetIdFromUrl(url);
    if (!assetId) {
      throw new Error(`Could not extract asset ID from URL:${url}`);
    }
    return {
      _key: nanoid(),
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: assetId,
      },
    };
  });
  const newImgArr = imageAssets.map((imageAsset) => ({
    _key: nanoid(),
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: imageAsset._id,
    },
  }));
  return client
    .patch(id)
    .set({
      _type: 'project',
      title,
      description,
      achievements: achievements.map((item) => ({ ...item, _key: nanoid() })),
      skills,
      githubLink,
      webLink,
      storeLink,
      images: [...existingImgArr, ...newImgArr],
      startDate: format(new Date(startDate), 'yyyy-MM-dd'),
      endDate: format(new Date(endDate), 'yyyy-MM-dd'),
      type,
      authorId,
    })
    .commit();
};
export const deleteProject = (id: string) => {
  return client.delete(id);
};
