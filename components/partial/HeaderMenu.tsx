"use client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const HeaderMenu = () => {
  return (
    <div className="flex space-x-5 items-center">
      {/* {user ? (
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
            <button className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-2 cursor-pointer hover:bg-slate-100">
              <PenBox size={16} /> Create Post
            </button>
            <DropdownMenuItem onClick={handleLogout}>
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
      )} */}

      <Link href="/sign-in" className={buttonVariants({ variant: "link" })}>
        Sign In
      </Link>
      <Link href="/sign-up" className={buttonVariants()}>
        Sign Up
      </Link>
    </div>
  );
};

export default HeaderMenu;
