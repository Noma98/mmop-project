import SanityClient from '@/service/sanity';
import SettingSanity from '@/service/setting';

export type OAuthMember = {
  id: string;
  userName: string;
  userId: string;
  email: string;
  image: string;
};
export type FullMember = {
  userId: string;
  userName?: string;
  phoneNum?: string;
  email: string;
  skills: string[];
  profile?: string;
  googleProfile: string;
  github?: string;
  setting?: {
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
type FormMember = FullMember & { _id: string };

export interface MemberSanityType {
  create({ id, userId, email, userName, image }: OAuthMember): Promise<any>;
  read(userId: string): Promise<FullMember | null>;
  update(data: FormMember, file: File | null): Promise<any>;
}
export default class MemberSanity
  extends SanityClient
  implements MemberSanityType
{
  public create = async ({
    id,
    userId,
    email,
    userName,
    image,
  }: OAuthMember) => {
    const settingSanity = new SettingSanity();
    const newSetting = await settingSanity.create(id);
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
    return this.getClient().createIfNotExists(data);
  };
  public read = async (userId: string): Promise<FullMember | null> => {
    const data = await this.getClient().fetch(
      `*[_type=="member"&&userId=="${userId}"][0]{...,setting->}`
    );
    return {
      ...data,
      profile: data.profile && this.urlFor(data.profile),
      setting: {
        ...data.setting,
        logo: !data.setting.logo ? '' : this.urlFor(data.setting.logo),
      },
    };
  };
  public update = async (data: FormMember, file: File | null) => {
    const { _id, userName, phoneNum, skills, profile, github } = data;
    return this.getClient()
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
                    ? (await this.getClient().assets.upload('image', file))._id
                    : this.extractAssetIdFromUrl(profile as string),
                },
              },
        userName,
        phoneNum,
        skills,
        github,
      })
      .commit();
  };
}
