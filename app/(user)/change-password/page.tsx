"use client";
import { changePasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ChangePassword = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordValidator),
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
      oldPassword: "",
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
          name="newPassword"
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
          name="newPasswordConfirm"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Retype New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Current Password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-normal" />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Change Password
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassword;
