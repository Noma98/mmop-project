import { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/app/global.css';
import AuthContext from '@/app/context/AuthContext';
import SWRConfigContext from '@/app/context/SWRConfigContext';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 700',
  variable: '--font-pretendard',
});
export const metadata: Metadata = {
  title: {
    default: 'mmop',
    template: '%s | mmop',
  },
  description: 'Portfolio creation web services',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${pretendard.variable}`}>
      <body className={`${pretendard.className}`}>
        <AuthContext>
          <SWRConfigContext>
            <Header />
            <main className='pt-[70px]'>{children}</main>
            <Footer />
          </SWRConfigContext>
        </AuthContext>
      </body>
    </html>
  );
}
