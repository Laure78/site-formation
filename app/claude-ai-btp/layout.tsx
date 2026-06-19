import { Poppins } from 'next/font/google';

export const revalidate = 3600;

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function ClaudeAiBtpLayout({ children }: { children: React.ReactNode }) {
  return <div className={poppins.className}>{children}</div>;
}
