import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bookmark,
  HomeIcon,
  MessageCircleMore,
  PenLine,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";

import Post from "@/components/shared/Post";

export default function Home() {
  return (
    <section className="grid grid-cols-12 gap-5">
      <div className="col-span-2 bg-white h-[calc(100vh-75px)]">
        <div className="px-10 py-5 space-y-5">
          <ul className="space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <HomeIcon size={20} /> Home
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <MessageCircleMore size={20} /> Message
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <Users size={20} /> Groups
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <ShoppingBag size={20} /> Marketplace
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <Bookmark size={20} /> My Favorites
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 font-medium text-base w-full p-2.5 rounded-md cursor-pointer hover:bg-green-50 hover:text-green-500 transition-all duration-300"
            >
              <Settings size={20} /> Settings
            </Link>
          </ul>
          <div className="space-y-5">
            <p className="font-medium flex items-center justify-between pb-3 border-b border-b-slate-100">
              My Favorites Post <PenLine size={20} />
            </p>

            <div>
              <ul className="space-y-2.5">
                <li className="text-sm font-normal text-slate-600 hover:text-slate-900">
                  <Link href="/">
                    How to Water Your Plants for Optimal Growth
                  </Link>
                  <p className="text-slate-300">2 min ago</p>
                </li>
                <li className="text-sm font-normal text-slate-600 hover:text-slate-900">
                  <Link href="/">
                    The Ultimate Guide to Container Gardening
                  </Link>
                  <p className="text-slate-300">2 days ago</p>
                </li>
                <li className="text-sm font-normal text-slate-600 hover:text-slate-900">
                  <Link href="/">
                    Organic Pest Control: Keep Your Garden Pest-Free Naturally
                  </Link>
                  <p className="text-slate-300">7 days ago</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        id="scroll-bar"
        className="col-span-8 h-[calc(100vh-75px)] overflow-y-auto py-5 space-y-5"
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Post key={i} />
        ))}
      </div>
      <div className="col-span-2 bg-white h-[calc(100vh-75px)]">
        <div className="px-10 py-5 space-y-5">
          <div className="space-y-5">
            <p className="text-sm font-medium text-slate-400 pb-2 border-b border-b-slate-100">
              Followers
            </p>
            <ul className="space-y-3.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="group">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://randomuser.me/api/portraits/men/${
                          i + 50
                        }.jpg`}
                        alt="user"
                      />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm group-hover:font-bold font-medium text-slate-600">
                        Tom Holland
                      </p>
                      <p className="text-slate-400 font-normal text-xs">
                        New York
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <p className="text-sm font-medium text-slate-400 pb-2 border-b border-b-slate-100">
              Following
            </p>
            <ul className="space-y-3.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <li key={i} className="group">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://randomuser.me/api/portraits/men/${
                          i + 50
                        }.jpg`}
                        alt="user"
                      />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm group-hover:font-bold font-medium text-slate-600">
                        Tom Holland
                      </p>
                      <p className="text-slate-400 font-normal text-xs">
                        New York
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
