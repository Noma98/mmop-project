import { FaGithub } from 'react-icons/fa';

type Props = {
  size?: string;
};
export default function GithubIcon({ size = '5' }: Props) {
  return <FaGithub className={`w-${size} h-${size}`} />;
}
