import React from 'react';
import { render } from '@testing-library/react';
import TopBanner from '@/components/user/TopBanner';
import { testMember } from '@/tests/member';

jest.mock('@/components/user/GithubOverview', () => {
  return jest.fn(() => <div>Github Overview</div>);
});

describe('TopBanner Component', () => {
  const mockProps = {
    ...testMember,
    userName: 'John Doe',
  };

  it('renders the username correctly', () => {
    const { getByText } = render(<TopBanner {...mockProps} />);
    expect(getByText("Hey, I'm John")).toBeInTheDocument();
  });

  it('renders default user name(000) when userName is not provided', () => {
    const { getByText } = render(
      <TopBanner {...mockProps} userName={undefined} />
    );
    expect(getByText("Hey, I'm 000")).toBeInTheDocument();
  });
  it('renders the subtitle correctly', () => {
    const { getByText } = render(<TopBanner {...mockProps} />);
    expect(getByText(mockProps.setting.subtitle)).toBeInTheDocument();
  });

  it('renders the GithubOverview component when github prop is provided', () => {
    const { getByText } = render(<TopBanner {...mockProps} />);
    expect(getByText('Github Overview')).toBeInTheDocument();
  });

  it('does not render the GithubOverview component when github prop is not provided', () => {
    const { queryByText } = render(
      <TopBanner {...mockProps} github={undefined} />
    );
    expect(queryByText('Github Overview')).not.toBeInTheDocument();
  });
});
