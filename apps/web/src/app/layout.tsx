import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@tasks-center/ui/global.css";
import NextAuthSessionProvider from "../providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tasks Center",
  description: "Gerenciador de tarefas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="pt-br" className="h-screen">
        <body className={`${inter.className} h-screen`}>{children}</body>
      </html>
    </NextAuthSessionProvider>
  );
}
