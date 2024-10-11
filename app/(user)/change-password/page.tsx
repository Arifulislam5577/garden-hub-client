"use client";
import { changePasswordAction } from "@/actions/actions";
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
import useServerAction from "@/hooks/useServerAction";
import { changePasswordValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const { mutate, isPending, isSuccess } = useServerAction({
    mutationFn: changePasswordAction,
    mutationKey: ["change-password"],
    onSuccessMessage: "Password changed. Please login again.",
  });

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
    mutate({
      newPassword: value.newPasswordConfirm,
      oldPassword: value.oldPassword,
    });
  });

  useEffect(() => {
    if (isSuccess) {
      signOut();
    }
  }, [isSuccess]);

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

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Changing password..." : "Change Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassword;
