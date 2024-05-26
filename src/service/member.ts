import { client } from './sanity';
import { addSetting } from './setting';

type OAuthMember = {
  id: string;
  userId: string;
  email: string;
  image: string;
};
export const addMember = async ({ id, userId, email, image }: OAuthMember) => {
  const newSetting = await addSetting();
  const data = {
    _id: id,
    _type: 'member',
    userId,
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
