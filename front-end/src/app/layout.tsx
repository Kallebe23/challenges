import "@/assets/css/reset.css";
import "@/assets/css/globals.css";
import "@/assets/css/layout.css";
import "@/assets/css/ui.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import ReactQueryProvider from "@/lib/react-query/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tractian - Frontend Challenge",
  description: "Visualize the hierarchy of assets in a tree structure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </main>
      </body>
    </html>
  );
}
