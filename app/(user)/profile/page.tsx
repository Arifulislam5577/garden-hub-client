"use client";
import { getProfileAction, updateProfileAction } from "@/actions/actions";
import { queryClient } from "@/components/shared/AppProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { TUser } from "@/types";
import { updateProfileValidator } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useSession } from "next-auth/react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const Profile = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FieldValues) => updateProfileAction(formData),
    onSuccess: () => {
      toast.success("Profile Updated");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const [resource, setResource] = useState<CloudinaryUploadWidgetInfo>();
  const { data: session } = useSession();
  const user = session?.user as TUser | undefined;

  const form = useForm({
    resolver: zodResolver(updateProfileValidator),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      address: user?.address,
      img: user?.img,
      phone: user?.phone,
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit((value) => {
    mutate(value);
  });

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => getProfileAction(),
  });

  const profile = data?.data as TUser | undefined;

  useEffect(() => {
    if (profile) {
      reset({
        name: profile?.name,
        email: profile?.email,
        address: profile?.address,
        img: resource ? resource?.secure_url : profile?.img,
        phone: profile?.phone,
      });
    }
  }, [profile, reset, resource]);

  return (
    <div className="flex basis-0 items-stretch gap-10">
      <div className="basis-1/3 flex flex-col items-center text-center border p-5 border-slate-100 gap-5">
        <div className="size-20 rounded-full border border-slate-100 flex items-center justify-center relative group:">
          <Avatar className="size-[75px]">
            <AvatarImage src={resource?.secure_url ?? profile?.img} />
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result: any) => {
              setResource(result?.info);
            }}
            onQueuesEnd={(result, { widget }) => {
              widget.close();
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                setResource(undefined);
                open();
              }
              return (
                <button
                  onClick={handleOnClick}
                  className="absolute bottom-0 right-0 bg-slate-900 text-slate-50 p-1 rounded-full"
                >
                  <Camera size={16} />
                </button>
              );
            }}
          </CldUploadWidget>
        </div>

        <div>
          <h1 className="text-xl font-bold">{profile?.name}</h1>
          <p className="text-slate-500 text-sm">{profile?.email}</p>
          <p className="text-slate-500 text-sm">{profile?.address}</p>
          <p className="text-slate-500 text-sm">{profile?.phone}</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="basis-2/3">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Name" {...field} />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3 ">
                <FormLabel>Email (Read Only)</FormLabel>
                <FormControl className="opacity-50 focus:outline-none">
                  <Input
                    readOnly
                    type="email"
                    placeholder="Email address"
                    {...field}
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
                  <Input type="text" placeholder="Address" {...field} />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="img"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Image Link" {...field} />
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
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Phone" {...field} />
                </FormControl>
                <FormMessage className="font-normal" />
              </FormItem>
            )}
          />

          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Profile;
