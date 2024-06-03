import { getProjects } from '@/service/project';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    userId: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  return getProjects(context.params.userId).then((data) =>
    NextResponse.json(data)
  );
}
