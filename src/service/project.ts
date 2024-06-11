import { nanoid } from 'nanoid';
import { format } from 'date-fns';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import SanityClient from '@/service/sanity';
import { getYears } from '@/utils/filter';

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

type ProjectFormData = {
  data: Omit<Project, 'images'> & { imageUrls: string[] };
  files: FormDataEntryValue[];
};

export interface ProjectSanityType {
  read(userId: string, year: string, type: string): Promise<Project[]>;
  create({ data, files }: ProjectFormData): Promise<any>;
  update({ data, files }: ProjectFormData): Promise<any>;
  delete(id: string): Promise<any>;
}
export default class ProjectSanity
  extends SanityClient
  implements ProjectSanityType
{
  read = async (userId: string, year: string, type: string) => {
    let query = `*[_type=="project"&&authorId=="${userId}"`;
    if (year !== 'ALL') {
      query += `&&${year} in years`;
    }
    if (type !== 'ALL') {
      query += `&&type=="${type}"`;
    }
    query += `]|order(endDate desc)`;
    const data = await this.getClient().fetch(query);
    return data.map((item: RawProject) => ({
      ...item,
      id: item._id,
      images: item.images.map((imgObj: SanityImageSource) =>
        this.urlFor(imgObj)
      ),
    }));
  };
  create = async ({
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
      files.map((file) =>
        this.getClient().assets.upload('image', file as File as File)
      )
    );
    const imageAssetIds = imageAssets.map((imageAsset) => imageAsset._id);
    return this.getClient().create({
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
      years: getYears(startDate, endDate),
      type,
      authorId,
    });
  };
  update = async ({
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
      files.map((file) => this.getClient().assets.upload('image', file as File))
    );
    const existingImgArr = imageUrls.map((url) => {
      const assetId = this.extractAssetIdFromUrl(url);
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
    return this.getClient()
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
  delete = (id: string) => {
    return this.getClient().delete(id);
  };
}
