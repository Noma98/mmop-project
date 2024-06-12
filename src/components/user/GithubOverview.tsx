import GithubCalendar from 'react-github-calendar';

type Props = {
  username: string;
};
function GithubOverview({ username }: Props) {
  return <GithubCalendar username={username} style={{ marginTop: 68 }} />;
}

export default GithubOverview;
