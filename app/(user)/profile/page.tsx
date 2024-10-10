"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TUser } from "@/types";
import { changePasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const { data: session } = useSession();
  const user = session?.user as TUser | undefined;
  const form = useForm({
    resolver: zodResolver(changePasswordValidator),
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
      oldPassword: "",
    },
  });
  const { control, handleSubmit } = form;
  const onSubmit = handleSubmit((value) => {
    console.log(value);
  });

  return (
    <div className="flex basis-0 items-start gap-10">
      <div className="basis-1/3 flex flex-col items-center text-center border p-5 border-slate-100 gap-5">
        <Avatar className="size-20 border-2 border-slate-200">
          <AvatarImage src="https://randomuser.me/api/portraits/men/11.jpg" />
          <AvatarFallback>CF</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="text-slate-500 text-sm">{user?.email}</p>
          <p className="text-slate-500 text-sm">{user?.address}</p>
          <p className="text-slate-500 text-sm">{user?.phone}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="basis-2/3">
          <FormField
            control={control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="newPasswordConfirm"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Retype New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Current Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
