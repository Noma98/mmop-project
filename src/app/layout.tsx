import '@/app/global.css';
import AuthContext from '@/app/context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <AuthContext>
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
