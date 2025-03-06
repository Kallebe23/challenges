import "@/assets/css/reset.css";
import "@/assets/css/globals.css";
import "@/assets/css/layout.css";
import "@/assets/css/ui.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";

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
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
      </body>
    </html>
  );
}
