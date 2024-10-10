import { Bookmark, HomeIcon, Lock, LogOut, PenBox, Users } from "lucide-react";
import Link from "next/link";
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
            <section className="max-w-7xl mx-auto py-20">
              <div className="bg-white p-8 rounded-xl flex items-start gap-5">
                <div className="w-[240px] border-r border-slate-100 pr-2">
                  <ul className="space-y-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
                    >
                      <HomeIcon size={20} /> Account
                    </Link>
                    <Link
                      href="/my-post"
                      className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
                    >
                      <PenBox size={20} /> My Post
                    </Link>
                    <Link
                      href="/follower"
                      className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
                    >
                      <Users size={20} /> Follower
                    </Link>
                    <Link
                      href="/change-password"
                      className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
                    >
                      <Lock size={20} /> Change Password
                    </Link>
                    <Link
                      href="/my-favorites"
                      className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
                    >
                      <Bookmark size={20} /> My Favorites
                    </Link>
                    <button className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-red-50 hover:text-red-500 transition-all duration-300">
                      <LogOut size={20} /> Logout
                    </button>
                  </ul>
                </div>
                <div className="flex-1">{children}</div>
              </div>
            </section>
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
