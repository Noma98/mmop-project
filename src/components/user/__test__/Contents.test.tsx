import useSWR from 'swr';
import { render, screen } from '@testing-library/react';

import Contents from '@/components/user/Contents';
import { testMember } from '@/tests/member';

jest.mock('swr');
jest.mock('@/components/user/AboutMe', () => () => (
  <div>AboutMe Component</div>
));
jest.mock('@/components/user/Projects', () => () => (
  <div>Projects Component</div>
));
jest.mock('@/components/user/TopBanner', () => () => (
  <div>TopBanner Component</div>
));
jest.mock('@/components/user/ContactMe', () => () => (
  <div>ContactMe Component</div>
));
jest.mock('@/components/common/LoadingSpinner', () => () => (
  <div>Loading...</div>
));

describe('Contents', () => {
  it('renders the child components with user data', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: testMember,
      isLoading: false,
    });
    render(<Contents userId='testId' />);
    expect(screen.getByText('TopBanner Component')).toBeInTheDocument();
    expect(screen.getByText('AboutMe Component')).toBeInTheDocument();
    expect(screen.getByText('Projects Component')).toBeInTheDocument();
    expect(screen.getByText('ContactMe Component')).toBeInTheDocument();
  });

  it('renders loading spinner when user data is not available', () => {
    (useSWR as jest.Mock).mockReturnValue({ data: undefined, isLoading: true });
    render(<Contents userId='testId' />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('TopBanner Component')).not.toBeInTheDocument();
    expect(screen.queryByText('AboutMe Component')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects Component')).not.toBeInTheDocument();
    expect(screen.queryByText('ContactMe Component')).not.toBeInTheDocument();
  });
});
