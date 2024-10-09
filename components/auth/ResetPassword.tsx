"use client";
import { resetPasswordValidator } from "@/validation";
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

const ResetPassword = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordValidator),
    defaultValues: {
      pass: "",
      token: "",
    },
  });
  const { control, handleSubmit } = form;
  const onSubmit = handleSubmit((value) => {
    const resetData = {
      password: value.pass,
      resetToken: value.token,
    };
    console.log(resetData);
  });

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

        <Button type="submit" className="w-full">
          Reset Token
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
