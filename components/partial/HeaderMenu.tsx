"use client";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const HeaderMenu = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex space-x-5 items-center">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user?.img} alt={user?.name} />
              <AvatarFallback>{user?.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My Post</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
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
    </div>
  );
};

export default HeaderMenu;
