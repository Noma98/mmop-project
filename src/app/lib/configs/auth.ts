import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { addMember } from '@/service/member';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, image, name } }) {
      if (!email) {
        return false;
      }
      await addMember({
        id,
        userName: name || '',
        userId: email.split('@')[0],
        email,
        image: image as string,
      });
      return true;
    },
    async session({ session }) {
      session.user.userId = session.user?.email?.split('@')[0] || '';
      return session;
    },
  },
};
export default authOptions;
