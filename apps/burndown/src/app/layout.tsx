import type { Metadata } from "next";

import "@tasks-center/ui/global.css";
export const metadata: Metadata = {
  title: "Controle de tarefas",
  description: "Gerenciador de tarefas com graficos de burndown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
