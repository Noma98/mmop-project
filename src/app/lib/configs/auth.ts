import { sanityService } from '@/service';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const user = session?.user;
      if (user) {
        session.user = {
          ...user,
          userId: session.user?.email?.split('@')[0] || '',
          id: token.id as string,
        };
      }
      return session;
    },
    async signIn({ user: { id, email, image, name } }) {
      if (!email) {
        return false;
      }
      await sanityService.member.create({
        id,
        userName: name || '',
        userId: email.split('@')[0],
        email,
        image: image as string,
      });
      return true;
    },
  },
};
export default authOptions;
