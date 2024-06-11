import { NextRequest, NextResponse } from 'next/server';

import { sanityService } from '@/service';

type Context = {
  params: {
    userId: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  return sanityService.member
    .read(context.params.userId)
    .then((data) => NextResponse.json(data));
}
