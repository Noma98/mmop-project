import StartLabel from '../StartLabel';
import { render, screen } from '@testing-library/react';

describe('StartLabel', () => {
  it('renders correctly without user', () => {
    render(<StartLabel />);
    expect(screen.getByText("Let's start now (・_-)/☼✧")).toBeInTheDocument();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', '/api/auth/signin');
  });
  it('renders correctly with user', () => {
    const testUser = {
      userId: 'test',
    };
    render(<StartLabel user={testUser} />);
    expect(screen.getByText("Let's start now (・_-)/☼✧")).toBeInTheDocument();
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/id/${testUser.userId}`);
  });
});
