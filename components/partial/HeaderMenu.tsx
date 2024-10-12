"use client";
import { TUser } from "@/types";
import { LogOut, PenBox, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import CreatePost from "../post/CreatePost";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();
  const user = data?.user as TUser | undefined;
  return (
    <div className="flex space-x-5 items-center">
      {status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user?.img} alt={user?.name} />
              <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="gap-2 cursor-pointer">
                <User size={16} /> Profile
              </Link>
            </DropdownMenuItem>
            <button
              onClick={() => setOpen(true)}
              className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2 cursor-pointer hover:bg-slate-100"
            >
              <PenBox size={16} /> Create Post
            </button>
            <DropdownMenuItem className="gap-2" onClick={() => signOut()}>
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>
            Sign In
          </Link>
          <Link href="/sign-up" className={buttonVariants()}>
            Sign Up
          </Link>
        </>
      )}

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default HeaderMenu;
