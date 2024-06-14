import useSWR from 'swr';

import { Project } from '@/service/project';

type Props = {
  userId: string;
};
export default function useProjectDetail({ userId }: Props) {
  const { data: projects, isLoading } = useSWR<Project[]>(
    `/api/project/${userId}`
  );
  return { projects, isLoading };
}
