import { NextRequest, NextResponse } from 'next/server';

import { sanityService } from '@/service';

type Context = {
  params: {
    userId: string;
  };
};
export async function GET(req: NextRequest, context: Context) {
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year') || 'ALL';
  const type = searchParams.get('type') || 'ALL';

  return sanityService.project
    .read(context.params.userId, year, type)
    .then((data) => NextResponse.json(data));
}
