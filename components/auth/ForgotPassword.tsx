"use client";
import { useForgotPassMutation } from "@/redux/api/authApi";
import { TErrorResponse } from "@/types";
import { forgotPasswordValidator } from "@/validation";
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

const ForgotPassword = () => {
  const [sendCode, { isLoading, isError, isSuccess, error }] =
    useForgotPassMutation();

  const form = useForm({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: "",
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
          name="email"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@email.com"
                  {...field}
                  className="py-4"
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Loading..." : "Send Code"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
