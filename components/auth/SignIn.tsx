"use client";
import { signInAction } from "@/actions/actions";
import { signInValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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

const SignIn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { mutate, isPending, isSuccess } = useMutation<
    unknown,
    Error,
    FieldValues
  >({
    mutationKey: ["signIn"],
    mutationFn: async (userData) => await signInAction(userData),
    onSuccess: () => {
      toast.success("Sign In successful.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm({
    resolver: zodResolver(signInValidator),
    defaultValues: {
      email: "",
      pass: "",
    },
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (value) => {
    const info = {
      email: value.email,
      password: value.pass,
    };

    mutate(info);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();

      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isSuccess, redirect, reset, router]);

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
        <FormField
          control={control}
          name="pass"
          render={({ field }) => (
            <FormItem className="mb-3">
              <div>
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl>
                <Input
                  placeholder="password"
                  type="password"
                  {...field}
                  className="py-4"
                />
              </FormControl>

              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Loading..." : "Sign In"}
        </Button>
        <div className="text-right mt-3">
          <Link
            href="/forgot-password"
            className="text-sm text-medium text-slate-900 hover:underline text-center"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;
