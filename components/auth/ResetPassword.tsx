"use client";
import { useResetPassMutation } from "@/redux/api/authApi";
import { TErrorResponse } from "@/types";
import { resetPasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ResetPassword = () => {
  const [resetPass, { isLoading, isError, isSuccess, error }] =
    useResetPassMutation();

  const form = useForm({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      pass: "",
      token: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit = handleSubmit((value) => {
    const resetData = {
      password: value.pass,
      resetToken: value.token,
    };
    resetPass(resetData);
  });

  const err = error as TErrorResponse;

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast("Password Reset Successfully");
      redirect("/sign-in");
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
          name="pass"
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
          name="token"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Reset Token</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Reset token" {...field} />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Resetting..." : "Reset Token"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
