import { getProjects } from '@/service/project';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, context: Context) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') || 'ALL';
  const type = searchParams.get('type') || 'ALL';

  return getProjects(context.params.userId, year, type).then((data) =>
    NextResponse.json(data)
  );
}
