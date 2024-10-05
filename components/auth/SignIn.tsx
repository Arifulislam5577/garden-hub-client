"use client";
import { useSignInMutation } from "@/redux/api/authApi";
import { userLogin } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TErrorResponse } from "@/types";
import { signInValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [signIn, { isLoading, isError, isSuccess, error }] =
    useSignInMutation();

  const form = useForm({
    resolver: zodResolver(signInValidator),
    defaultValues: {
      email: "",
      pass: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit = handleSubmit(async (value) => {
    const { data, token } = await signIn({
      password: value.pass,
      ...value,
    }).unwrap();

    dispatch(userLogin({ user: data, token }));
  });

  const err = error as TErrorResponse;

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast("Sign up successfully");
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
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Loading..." : "Sign In"}
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
