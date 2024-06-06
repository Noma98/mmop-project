import { client, extractAssetIdFromUrl, urlFor } from './sanity';
import { addSetting } from './setting';

export type OAuthMember = {
  id: string;
  userName: string;
  userId: string;
  email: string;
  image: string;
};
export const addMember = async ({
  id,
  userId,
  email,
  userName,
  image,
}: OAuthMember) => {
  const newSetting = await addSetting(id);
  const data = {
    _id: id,
    _type: 'member',
    userId,
    userName,
    email,
    phoneNum: '',
    googleProfile: image,
    projects: [],
    setting: {
      _ref: newSetting._id,
      _type: 'setting',
    },
    skills: [],
    github: '',
  };
  return client.createIfNotExists(data);
};
export type FullMember = {
  userId: string;
  userName: string;
  phoneNum: string;
  email: string;
  skills: string[];
  profile?: string;
  googleProfile: string;
  github?: string;
  setting: {
    title: string;
    subtitle: string;
    logo?: string;
    bgColors: {
      left: string;
      right: string;
    };
    introduction: string;
  };
};
export const getMember = async (userId: string): Promise<FullMember | null> => {
  const data = await client.fetch(
    `*[_type=="member"&&userId=="${userId}"][0]{...,setting->}`
  );
  return {
    ...data,
    profile: data.profile && urlFor(data.profile),
    setting: {
      ...data.setting,
      logo: !data.setting.logo ? '' : urlFor(data.setting.logo),
    },
  };
};
type FormMember = FullMember & { _id: string };
export const updateMember = async (data: FormMember, file: File | null) => {
  const { _id, userName, phoneNum, skills, profile, github } = data;
  return client
    .patch(_id)
    .set({
      _type: 'member',
      profile:
        !profile && !file
          ? ''
          : {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: file
                  ? (await client.assets.upload('image', file))._id
                  : extractAssetIdFromUrl(profile as string),
              },
            },
      userName,
      phoneNum,
      skills,
      github,
    })
    .commit();
};
