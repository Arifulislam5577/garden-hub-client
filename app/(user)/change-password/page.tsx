"use client";
import { useForgotPassMutation } from "@/redux/api/authApi";
import { TErrorResponse } from "@/types";
import { changePasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

const ChangePassword = () => {
  const [sendCode, { isLoading, isError, isSuccess, error }] =
    useForgotPassMutation();

  const form = useForm({
    resolver: zodResolver(changePasswordValidator),
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
      oldPassword: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit = handleSubmit((value) => {
    sendCode({ ...value });
  });

  const err = error as TErrorResponse;

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast("Reset Token sent to your email");
      redirect("/reset-password");
    }

    if (isError) {
      toast.error(err?.data?.message);
    }
  }, [error, isError, isSuccess, reset, err?.data]);
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} />
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

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Loading..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassword;
