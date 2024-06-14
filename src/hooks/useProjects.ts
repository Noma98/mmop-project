import { useEffect } from 'react';
import useSWR from 'swr';

import { Project } from '@/service/project';

type Props = {
  userId: string;
  activeYear: string;
  activeType: string;
};
export default function useProjects({ userId, activeType, activeYear }: Props) {
  const {
    data: projects,
    isLoading,
    mutate,
  } = useSWR<Project[]>(
    `/api/project/${userId}?year=${activeYear}&type=${activeType}`
  );
  useEffect(() => {
    mutate();
  }, [activeType, activeYear, mutate]);

  return { projects, isLoading };
}
