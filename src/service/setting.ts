import { client } from './sanity';

export const addSetting = (id: string) => {
  return client.createIfNotExists({
    _id: id,
    _type: 'setting',
    title: '',
    subtitle: '',
    introduction: '',
    bgColors: {
      left: '#ffffff',
      right: '#ffffff',
    },
    logo: '',
  });
};
