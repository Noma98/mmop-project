import { NextRequest, NextResponse } from 'next/server';

import { withSessionUser } from '@/utils/session';
import { sanityService } from '@/service';

export async function POST(req: NextRequest) {
  return withSessionUser(async () => {
    const form = await req.formData();
    const data = JSON.parse(form.get('data')?.toString() as string);
    const files = form.getAll('file');

    return sanityService.project
      .create({
        data,
        files,
      })
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
export async function PUT(req: NextRequest) {
  return withSessionUser(async () => {
    const form = await req.formData();
    const data = JSON.parse(form.get('data')?.toString() as string);
    const files = form.getAll('file');

    return sanityService.project
      .update({
        data,
        files,
      })
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
export async function DELETE(req: NextRequest) {
  return withSessionUser(async () => {
    const { id } = await req.json();

    return sanityService.project
      .delete(id)
      .then((res) => NextResponse.json(res))
      .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
  });
}
