"use client";
import { useSignUpMutation } from "@/redux/api/authApi";
import { TErrorResponse } from "@/types";
import { signUpValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
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

const SignUp = () => {
  const [signUp, { isLoading, isError, isSuccess, error }] =
    useSignUpMutation();
  const form = useForm({
    resolver: zodResolver(signUpValidator),
    defaultValues: {
      name: "",
      email: "",
      pass: "",
      address: "",
      phone: "",
    },
  });
  const { control, handleSubmit, reset } = form;
  const onSubmit = handleSubmit((data) => {
    const userInfo = {
      ...data,
      password: data.pass,
    };

    signUp(userInfo);
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
          name="name"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />
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
              <FormLabel>Password</FormLabel>
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
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your phone number"
                  type="text"
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
          name="address"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="123 State, Street, City"
                  type="text"
                  {...field}
                  className="py-4"
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUp;
