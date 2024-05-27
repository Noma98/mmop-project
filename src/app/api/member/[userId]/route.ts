import { NextRequest, NextResponse } from 'next/server';

import { getMember } from '@/service/member';

type Context = {
  params: {
    userId: string;
  };
};
export async function GET(_: NextRequest, context: Context) {
  return getMember(context.params.userId).then((data) =>
    NextResponse.json(data)
  );
}
