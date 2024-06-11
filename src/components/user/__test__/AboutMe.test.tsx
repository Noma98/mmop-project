import { render, screen } from '@testing-library/react';
import AboutMe from '../AboutMe';
import { testMember } from '../../../tests/member';

type ImageProps = {
  src: string;
  alt: string;
};
jest.mock('next/image', () => ({ src, alt }: ImageProps) => (
  <img src={src} alt={alt} />
));
jest.mock('../../common/LoadingSpinner', () => () => <div>Loading...</div>);

describe('AboutMe', () => {
  it('renders the profile image from profile prop', () => {
    render(<AboutMe {...testMember} />);
    const profileImage = screen.getByAltText('profile');
    expect(profileImage).toHaveAttribute('src', testMember.profile);
  });

  it('renders the profile image from googleProfile props if profile is not provided', () => {
    render(<AboutMe {...testMember} profile={undefined} />);
    const profileImage = screen.getByAltText('profile');
    expect(profileImage).toHaveAttribute('src', testMember.googleProfile);
  });

  it('renders the introduction and skills when setting is provided', () => {
    render(<AboutMe {...testMember} />);
    expect(screen.getByText('testIntroduction')).toBeInTheDocument();
    testMember.skills.forEach((v) =>
      expect(screen.getByText(v)).toBeInTheDocument()
    );
  });

  it('renders loading spinner when setting is not provided', () => {
    render(<AboutMe {...testMember} setting={undefined} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
