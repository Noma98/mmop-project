import { client } from './sanity';
import { addSetting } from './setting';

type OAuthMember = {
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
  const newSetting = await addSetting();
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
