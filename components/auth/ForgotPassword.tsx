"use client";
import { forgotPasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
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

const ForgotPassword = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordValidator),
    defaultValues: {
      email: "",
    },
  });
  const { control, handleSubmit } = form;
  const onSubmit = handleSubmit((value) => {
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

        <Button type="submit" className="w-full">
          Send Code
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPassword;
