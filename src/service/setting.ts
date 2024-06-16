import { FullMember } from '@/service/member';
import SanityClient from '@/service/sanity';

type Setting = FullMember['setting'] & { _id: string };
export interface SettingSanityType {
  create(id: string): void;
  update(data: Setting, file: File | null): Promise<any>;
}
export default class SettingSanity
  extends SanityClient
  implements SettingSanityType
{
  create = (id: string) => {
    return this.getClient().createIfNotExists({
      _id: id,
      _type: 'setting',
      title: '',
      subtitle: '',
      introduction: '',
      bgColors: {
        left: '#D0E9F7',
        right: '#D0E9F7',
      },
    });
  };
  update = async (data: Setting, file: File | null) => {
    const { _id, bgColors, introduction, subtitle, logo, title } = data;

    return this.getClient()
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
                    ? (await this.getClient().assets.upload('image', file))._id
                    : this.extractAssetIdFromUrl(logo as string),
                },
              },
        bgColors,
      })
      .commit();
  };
}
