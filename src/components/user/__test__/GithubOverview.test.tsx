import GithubCalendar from 'react-github-calendar';
import { render } from '@testing-library/react';

import GithubOverview from '@/components/user/GithubOverview';
import useCheckValidGithub from '@/hooks/useCheckValidGithub';

jest.mock('@/hooks/useCheckValidGithub');
jest.mock('react-github-calendar');
jest.mock('@/components/common/LoadingSpinner', () => () => (
  <div>Loading...</div>
));

describe('GithubOverview', () => {
  it('renders GithubCalendar with valid username', () => {
    const validUser = 'vercel';
    (useCheckValidGithub as jest.Mock).mockReturnValue({ isValid: true });
    (GithubCalendar as jest.Mock).mockImplementation(({ username }) => (
      <div>{username}</div>
    ));
    const { getByText } = render(<GithubOverview username={validUser} />);
    expect(getByText(validUser)).toBeInTheDocument();
  });
  it('renders loading spinner before validation', () => {
    const validUser = 'vercel';
    (useCheckValidGithub as jest.Mock).mockReturnValue({ isValid: undefined });
    const { getByText } = render(<GithubOverview username={validUser} />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });
  it('renders error ui with invalid username', () => {
    const invalidUser = 'random8721311';
    (useCheckValidGithub as jest.Mock).mockReturnValue({ isValid: false });
    const { getByText } = render(<GithubOverview username={invalidUser} />);
    expect(getByText('This user is invalid or private.')).toBeInTheDocument();
  });
});
