"use client";
import { forgotPasswordAction } from "@/actions/actions";
import { forgotPasswordValidator } from "@/validation";
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

const ForgotPassword = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useMutation<
    unknown,
    Error,
    FieldValues
  >({
    mutationKey: ["signIn"],
    mutationFn: async (userData) => await forgotPasswordAction(userData),
    onSuccess: () => {
      toast.success("Reset token sent to your email");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit = handleSubmit((value) => {
    mutate(value);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push("/reset-password");
    }
  }, [isSuccess, reset, router]);

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

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Sending..." : "Send Code"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
