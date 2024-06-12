import { render, screen } from '@testing-library/react';

import { testOAuthMember } from '@/tests/member';
import StartLabel from '@/components/home/StartLabel';

describe('StartLabel', () => {
  it('renders correctly without user', () => {
    render(<StartLabel />);
    expect(screen.getByText("Let's start now (・_-)/☼✧")).toBeInTheDocument();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/api/auth/signin');
  });
  it('renders correctly with user', () => {
    render(<StartLabel user={testOAuthMember} />);
    expect(screen.getByText("Let's start now (・_-)/☼✧")).toBeInTheDocument();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      `/id/${testOAuthMember.userId}`
    );
  });
});
