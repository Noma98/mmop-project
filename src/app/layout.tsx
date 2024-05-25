import { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/app/global.css';
import AuthContext from '@/app/context/AuthContext';

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
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
