"use client";
import { resetPasswordAction } from "@/actions/actions";
import { resetPasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
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
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useMutation<
    unknown,
    Error,
    FieldValues
  >({
    mutationKey: ["signIn"],
    mutationFn: async (userData) => await resetPasswordAction(userData),
    onSuccess: () => {
      toast.success("Password reset successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      token: "",
      pass: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit = handleSubmit((value) => {
    const { token, pass } = value;
    mutate({
      resetToken: token,
      password: pass,
    });
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push("/sign-in");
    }
  }, [isSuccess, reset, router]);

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

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Resetting password..." : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
