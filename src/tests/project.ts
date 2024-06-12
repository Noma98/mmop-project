import { Project } from '@/service/project';

export const testProject: Project = {
  id: 'test1234',
  title: 'Test Project',
  authorId: 'John Doe',
  startDate: '2023-01-01',
  endDate: '2023-12-31',
  skills: ['React', 'JavaScript', 'CSS'],
  description: 'This is a test project description.',
  type: 'business',
  images: ['/test1.png', '/test2.png'],
  webLink: 'https://test.com',
  storeLink: 'https://store.com/test',
  githubLink: 'https://github.com/test',
  achievements: [{ value: 'Achievement 1' }, { value: 'Achievement 2' }],
};
