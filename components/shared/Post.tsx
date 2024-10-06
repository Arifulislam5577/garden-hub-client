"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  Ellipsis,
  Forward,
  Heart,
  MessageCircleMore,
  SendHorizonal,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GardenImg from "@/public/garden.jpg";

const Post = () => {
  return (
    <div className="bg-white rounded-xl p-5 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Avatar className="border-2 border-slate-100">
            <AvatarImage
              src={`https://randomuser.me/api/portraits/men/11.jpg`}
              alt="user"
            />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-slate-600">Tom Holland</p>
            <p className="text-slate-400 font-normal text-xs">7 min ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Badge variant="outline">Premium</Badge>
          <button>
            <Bookmark size={16} />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="font-normal text-slate-600 text-base">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi repellat
        id minima incidunt nulla tempore sunt, debitis cumque voluptate sint
        nam. Voluptas, nisi. Cupiditate iure quod sapiente magni magnam
        quisquam. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi
        repellat id minima incidunt nulla tempore sunt, debitis cumque voluptate
        sint nam. Voluptas, nisi. Cupiditate iure quod sapiente magni magnam
        quisquam.
      </div>
      <div className="h-[400px] w-full object-cover rounded-md overflow-hidden">
        <Image src={GardenImg} alt="Garden" className="w-full" />
      </div>
      <div className="space-y-2.5">
        <div className="border-y border-y-slate-100 py-1.5 flex items-center justify-between">
          <div>
            <Button variant={"ghost"} className="gap-1.5">
              <Heart size={16} /> Upvote
            </Button>
            <Button variant={"ghost"} className="gap-1.5">
              <MessageCircleMore size={16} /> Comments
            </Button>
            <Button variant={"ghost"} className="gap-1.5">
              <Forward size={16} /> Share Now
            </Button>
          </div>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium text-slate-400">3.2K Upvote</p>
            <p className="text-sm font-medium text-slate-400">1.2K Comments</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <Avatar className="border-2 border-slate-100">
            <AvatarImage
              src={`https://randomuser.me/api/portraits/men/11.jpg`}
              alt="user"
            />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <form className="flex-1">
            <Input placeholder="Add a comment" />
          </form>
          <Button variant={"destructive"}>
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
