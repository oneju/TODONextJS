import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { orbit } from "./utils/fonts";

export const metadata: Metadata = {
  title: "TO-DO",
  description: "Personal todo app",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={orbit.className}>
        <Providers session={session}>
            {children}
        </Providers>
      </body>
    </html>
  );
}
