import { ReactNode } from "react";

import AppProvider from "@/components/shared/AppProvider";
import Header from "@/components/shared/Header";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Garden Hub || Tip and Advice",
  description: "Garden Hub || Tip and Advice",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
