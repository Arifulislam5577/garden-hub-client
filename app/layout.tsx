import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppProvider from "@/components/shared/AppProvider";
import Header from "@/components/shared/Header";
import "./globals.css";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Garden Hub || Tip and Advice",
  description: "Garden Hub || Tip and Advice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
