import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KIIMS Super Speciality Hospital - Kiosk Registration',
  description: 'Voice-based registration kiosk for KIIMS Super Speciality Hospital',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
} 