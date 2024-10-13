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
  Lock,
  MessageCircleMore,
  SendHorizonal,
} from "lucide-react";
import Image from "next/image";

import { postCommentAction, postLikeAction } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { queryClient } from "./AppProvider";

const Post = ({ post }: { post: any }) => {
  const { data } = useSession();

  const user = (data?.user as TUser) || null;

  const { mutate } = useMutation({
    mutationFn: async () => await postLikeAction(post?._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const { mutate: mutateComment, isSuccess } = useMutation({
    mutationFn: async (data: FieldValues) => await postCommentAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
  });

  const isUserAlreadLiked = post?.likes?.find(
    (data: any) => data.userId?._id.toString() === user?._id.toString()
  );

  const formValidate = z.object({
    commentText: z
      .string({
        required_error: "Comment is required",
        invalid_type_error: "Comment must be a string",
      })
      .min(1, {
        message: "Comment must be at least 1 character",
      }),
  });

  const form = useForm({
    resolver: zodResolver(formValidate),
    defaultValues: {
      commentText: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit((value) => {
    console.log(value);
    mutateComment({
      postId: post?._id,
      commentText: value,
    });
  });

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  return (
    <div className="bg-white rounded-xl p-5 space-y-2.5 mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Avatar className="border-2 border-slate-100">
            <AvatarImage src={post?.authorId?.img} alt="user" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-slate-600">
              {post?.authorId?.name}
            </p>
            <p className="text-slate-400 font-normal text-xs">7 min ago</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <Badge variant="outline">{post?.tag}</Badge>
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
      <div className="space-y-2.5 relative py-5">
        <div className="font-normal text-slate-600 text-base">
          {post?.content}
        </div>
        <div className="h-[400px] w-full object-cover rounded-md overflow-hidden">
          <Image
            src={post?.coverImg}
            alt="Garden"
            height={400}
            width={640}
            className="w-full"
          />
        </div>
        {post?.tag === "premium" && !user?.isVerified && (
          <div className="absolute top-0 left-0 h-full w-full bg-slate-900/95 rounded-xl p-5">
            <div className="flex items-center justify-center h-full text-white">
              <Lock size={55} />
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2.5">
        <div className="border-y border-y-slate-100 py-1.5 flex items-center justify-between">
          <div>
            <Button
              onClick={() => mutate(post?._id)}
              variant={"ghost"}
              className="gap-1.5"
            >
              {isUserAlreadLiked ? (
                <Heart size={16} className="fill-red-500" />
              ) : (
                <Heart size={16} />
              )}
              Upvote
            </Button>
            <Button variant={"ghost"} className="gap-1.5">
              <MessageCircleMore size={16} /> Comments
            </Button>
            <Button variant={"ghost"} className="gap-1.5">
              <Forward size={16} /> Share Now
            </Button>
          </div>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-medium text-slate-400">
              {post?.likes?.length} Upvote
            </p>
            <p className="text-sm font-medium text-slate-400">
              {post?.comments?.length} Comments
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 ">
          <Avatar className="border-2 border-slate-100">
            <AvatarImage src={user?.img} alt="user" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex flex-1 items-center gap-5"
            >
              <FormField
                control={control}
                name="commentText"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={user?.name + " Write your comment"}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"destructive"}>
                <SendHorizonal />
              </Button>
            </form>
          </Form>
        </div>

        {post?.comments?.length > 0 && (
          <div className="space-y-2.5 mt-2.5 ml-8">
            {post?.comments?.map((comment: any) => (
              <div key={comment?._id} className="flex items-start gap-2.5">
                <Avatar className="border-2 border-slate-100">
                  <AvatarImage src={comment?.userId?.img} alt="user" />
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
                <div className="bg-slate-50 p-2.5 rounded-md">
                  <p className="text-sm font-medium text-slate-600">
                    {comment?.userId?.name}
                  </p>
                  <p className="text-slate-600 font-normal text-sm">
                    {comment?.commentText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
