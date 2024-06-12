import Period from '@/components/user/Period';
import { render, screen, waitFor } from '@testing-library/react';

describe('Period', () => {
  it('renders correctly', () => {
    const testStartDate = '2024-03-21';
    const testEndDate = '2024-05-09';
    const { asFragment } = render(
      <Period startDate={testStartDate} endDate={testEndDate} />
    );

    expect(screen.getByText('2024-03')).toBeInTheDocument();
    expect(screen.getByText('2024-05')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
