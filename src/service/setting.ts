import { client } from './sanity';

export const addSetting = () => {
  return client.create({
    _type: 'setting',
    title: '',
    subtitle: '',
    introduction: '',
    bgColors: [],
    logo: '',
  });
};
