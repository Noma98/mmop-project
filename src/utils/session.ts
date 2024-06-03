import authOptions from '@/app/lib/configs/auth';
import { getServerSession } from 'next-auth';

type User = {
  userId: string;
} & {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function withSessionUser(
  handler: (user: User) => Promise<Response>
): Promise<Response> {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }
  return handler(user);
}
