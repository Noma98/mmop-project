import ProjectSanity, { ProjectSanityType } from '@/service/project';
import SettingSanity, { SettingSanityType } from '@/service/setting';
import MemberSanity, { MemberSanityType } from '@/service/member';

class SanityService {
  constructor(
    public project: ProjectSanityType,
    public setting: SettingSanityType,
    public member: MemberSanityType
  ) {}
}

const project = new ProjectSanity();
const setting = new SettingSanity();
const member = new MemberSanity();

export const sanityService = new SanityService(project, setting, member);
