"use client";
import { signInValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
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
  const form = useForm({
    resolver: zodResolver(signInValidator),
    defaultValues: {
      email: "",
      pass: "",
    },
  });
  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (value) => {
    console.log(value);
  });

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
        <Button type="submit" className="w-full">
          Sign In
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
