import { Bookmark, HomeIcon, LogOut, PenBox, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <div className="max-w-7xl mx-auto py-20">
        <div className="bg-white p-8 rounded-xl flex items-start gap-5">
          <div className="w-[200px] border-r border-slate-100 pr-2">
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
      </div>
    </section>
  );
};

export default UserLayout;
