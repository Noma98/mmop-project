import React from 'react';
import { useSession } from 'next-auth/react';
import { render, screen } from '@testing-library/react';

import Filter from '@/components/user/Filter';
import Projects from '@/components/user/Projects';
import ProjectCard from '@/components/user/ProjectCard';
import useProjects from '@/hooks/useProjects';
import { testMember, testOAuthMember } from '@/tests/member';
import { testProject } from '@/tests/project';

type ImageProps = {
  src: string;
  alt: string;
};
jest.mock('next/image', () => ({ src, alt }: ImageProps) => (
  <img src={src} alt={alt} />
));

jest.mock('@/components/user/ProjectCard', () =>
  jest.fn(() => <div>Project Card</div>)
);

jest.mock('@/components/user/Filter', () => jest.fn());
jest.mock('@/components/common/LoadingSpinner', () => () => (
  <div>Loading...</div>
));
jest.mock('@/components/icons', () => ({
  NoFilterIcon: jest.fn(),
}));

jest.mock('@/hooks/useProjects');
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');

  return {
    __esmodule: true,
    ...originalModule,
    useSession: jest.fn(),
  };
});

describe('Projects', () => {
  const testProjects = [testProject, testProject];

  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: testOAuthMember,
      },
      status: 'authenticated',
    });
  });
  it(`renders loading spinner`, () => {
    (useProjects as jest.Mock).mockReturnValue({
      projects: testProjects,
      isLoading: true,
    });
    render(
      <Projects
        {...{
          ...testMember,
          setting: { ...testMember.setting, bgColors: { left: '', right: '' } },
        }}
      />
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders registration UI if the author of the page is a logged-in user and there are no projects', () => {
    (useProjects as jest.Mock).mockReturnValue({
      projects: [],
      isLoading: false,
    });

    const { getByText } = render(<Projects {...testMember} />);
    expect(getByText(/You don't have any contents/)).toBeInTheDocument();
  });
  it('renders no content UI if the author of the page is another user and there are no projects', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        expires: new Date(Date.now() + 2 * 86400).toISOString(),
        user: { ...testOAuthMember, userId: 'anotherId' },
      },
      status: 'authenticated',
    });
    (useProjects as jest.Mock).mockReturnValue({
      projects: [],
      isLoading: false,
    });

    const { getByText } = render(<Projects {...testMember} />);
    expect(getByText(/No contents/)).toBeInTheDocument();
  });

  it(`renders filter and projects if there is a project`, async () => {
    (useProjects as jest.Mock).mockReturnValue({
      projects: testProjects,
      isLoading: false,
    });
    render(<Projects {...testMember} />);
    expect(Filter).toHaveBeenCalled();
    expect(ProjectCard).toHaveBeenCalledTimes(testProjects.length);
  });

  it('renders no search result UI if filter is not "ALL" and there is no project', async () => {
    const useStateMock = jest
      .fn()
      .mockReturnValueOnce(['2023', jest.fn()])
      .mockReturnValueOnce(['business', jest.fn()])
      .mockReturnValueOnce(['year', jest.fn()]);
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    (useProjects as jest.Mock).mockReturnValue({
      projects: [],
      isLoading: false,
    });
    render(<Projects {...testMember} />);

    expect(
      screen.getByText('No results with that filter.')
    ).toBeInTheDocument();
  });
});
