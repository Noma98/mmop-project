import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      userId: string;
      id: string;
    } & DefaultSession['user'];
  }
}
