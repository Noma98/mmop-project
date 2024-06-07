import NextAuth, { DefaultSession } from 'next-auth';

import { OAuthMember } from '@/service/member';

declare module 'next-auth' {
  interface Session {
    user: OAuthMember;
  }
}
