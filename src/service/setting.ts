import { FullMember } from '@/service/member';
import { client, extractAssetIdFromUrl } from '@/service/sanity';

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

type Setting = FullMember['setting'] & { _id: string };
export const updateSetting = async (data: Setting, file: File | null) => {
  const { _id, bgColors, introduction, subtitle, logo, title } = data;

  return client
    .patch(_id)
    .set({
      _type: 'setting',
      title,
      subtitle,
      introduction,
      logo:
        !logo && !file
          ? ''
          : {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: file
                  ? (await client.assets.upload('image', file))._id
                  : extractAssetIdFromUrl(logo),
              },
            },
      bgColors,
    })
    .commit();
};
