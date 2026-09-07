import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'carhuud',
  description: 'make yourself at home :3',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
