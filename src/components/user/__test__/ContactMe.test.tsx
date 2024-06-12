import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactMe from '../ContactMe';
import { testMember } from '../../../tests/member';

describe('ContactMe', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(''),
      },
    });
    Object.assign(window, {
      alert: jest.fn(),
    });
  });
  it('renders correctly', () => {
    const { asFragment } = render(<ContactMe {...testMember} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all buttons if all properties are provided', () => {
    render(<ContactMe {...testMember} />);
    expect(screen.queryByRole('link')).toHaveAttribute(
      'href',
      testMember.github
    );
    expect(screen.queryByLabelText('email')).toBeInTheDocument();
    expect(screen.queryByLabelText('phone')).toBeInTheDocument();
  });

  it('renders only email button if there is no github and phoneNum property', () => {
    render(
      <ContactMe {...testMember} github={undefined} phoneNum={undefined} />
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('email')).toBeInTheDocument();
    expect(screen.queryByLabelText('phone')).not.toBeInTheDocument();
  });

  it('copy email text when click email button', async () => {
    render(<ContactMe {...testMember} />);
    userEvent.click(screen.getByLabelText('email'));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        testMember.email
      )
    );
  });
  it('copies phone number and show alert when clicking phone button', async () => {
    render(<ContactMe {...testMember} />);
    userEvent.click(screen.getByLabelText('phone'));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        testMember.phoneNum
      )
    );
    expect(window.alert).toHaveBeenCalledWith('Copied it to your clipboard!');
  });
  it('show error alert when copying phone number fails', async () => {
    (navigator.clipboard.writeText as jest.Mock).mockRejectedValue(
      new Error('error')
    );
    render(<ContactMe {...testMember} />);
    userEvent.click(screen.getByLabelText('phone'));
    await waitFor(() =>
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        testMember.phoneNum
      )
    );
    expect(window.alert).toHaveBeenCalledWith('Error occured.');
  });
});
