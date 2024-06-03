import { NextRequest, NextResponse } from 'next/server';
import {
  createProjects,
  deleteProject,
  updateProject,
} from '@/service/project';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const data = JSON.parse(form.get('data')?.toString() as string);
  const files = form.getAll('file');

  return createProjects({
    data,
    files,
  })
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
export async function PUT(req: NextRequest) {
  const form = await req.formData();
  const data = JSON.parse(form.get('data')?.toString() as string);
  const files = form.getAll('file');

  return updateProject({
    data,
    files,
  })
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  return deleteProject(id)
    .then((res) => NextResponse.json(res))
    .catch((err) => new Response(JSON.stringify(err), { status: 500 }));
}
