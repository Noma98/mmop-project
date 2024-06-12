import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';

import ProjectCard from '@/components/user/ProjectCard';
import { testProject } from '@/tests/project';

type Props = {
  children: ReactNode;
};
jest.mock(
  '@/components/user/ImageCarousel',
  jest.fn(() => ({ children }: Props) => (
    <div data-testid='carousel'>{children}</div>
  ))
);

describe('ProjectCard', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<ProjectCard data={testProject} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('renders business lable if project type is business ', () => {
    render(<ProjectCard data={{ ...testProject, type: 'business' }} />);
    expect(screen.getByText('business')).toBeInTheDocument();
  });
  it('renders side label if project type is side', () => {
    render(<ProjectCard data={{ ...testProject, type: 'side' }} />);
    expect(screen.getByText('side')).toBeInTheDocument();
  });
  it('renders image carousel if images length is 1 or higher ', () => {
    render(<ProjectCard data={testProject} />);
    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getAllByAltText(/Test Project image/)).toHaveLength(
      testProject.images.length
    );
  });
  it('renders empty element if images length is 0', () => {
    render(<ProjectCard data={{ ...testProject, images: [] }} />);
    expect(screen.queryByTestId('carousel')).not.toBeInTheDocument();
  });
  it('must render at least one achievement', () => {
    render(<ProjectCard data={testProject} />);
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1);
  });
});
