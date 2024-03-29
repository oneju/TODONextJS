import type { Metadata } from "next";
import './globals.css'
import Providers from "../components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: "TO-DO",
  description: "Personal todo app",
  icons: {
    icon: "/favicon.png",
  },
};

const inter = Inter({ subsets: ['latin'] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
            {children}
        </Providers>
      </body>
    </html>
  );
}
