import { client, urlFor } from './sanity';
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
    profile: image,
    projects: [],
    setting: {
      _ref: newSetting._id,
      _type: 'setting',
    },
    skills: [],
  };
  return client.createIfNotExists(data);
};
export type FullMember = {
  userId: string;
  userName: string;
  phoneNum: string;
  email: string;
  skills: string[];
  profile: string;
  setting: {
    title: string;
    subtitle: string;
    logo: string;
    bgColors: string[];
    introduction: string;
  };
};
export const getMember = async (userId: string): Promise<FullMember | null> => {
  const data = await client.fetch(
    `*[_type=="member"&&userId=="${userId}"][0]{...,setting->}`
  );
  return {
    ...data,
    setting: {
      ...data.setting,
      logo: !data.setting.logo ? '' : urlFor(data.setting.logo),
    },
  };
};
