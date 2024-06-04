import { NextRequest, NextResponse } from 'next/server';

import { updateSetting } from '@/service/setting';
import { withSessionUser } from '@/utils/session';

export async function PUT(req: NextRequest) {
  return withSessionUser(async () => {
    const formData = await req.formData();
    const data = JSON.parse(formData.get('data')?.toString() as string);
    const file = (formData.get('file') as File) || null;

    return updateSetting(data, file)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
