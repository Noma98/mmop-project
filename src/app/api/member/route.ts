import { NextRequest, NextResponse } from 'next/server';

import { withSessionUser } from '@/utils/session';
import { sanityService } from '@/service';

export async function PUT(req: NextRequest) {
  return withSessionUser(async () => {
    const formData = await req.formData();
    const data = JSON.parse(formData.get('data')?.toString() as string);
    const file = (formData.get('file') as File) || null;

    return sanityService.member
      .update(data, file)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
