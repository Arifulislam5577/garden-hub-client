/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createPostAction } from "@/actions/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useServerAction from "@/hooks/useServerAction";
import { fileToBase64 } from "@/lib/fileToBase64";
import { createPostValidation } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "../ui/textarea";

const CreatePostForm = () => {
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useServerAction({
    mutationFn: createPostAction,
    mutationKey: ["post"],
    onSuccessMessage: "Post created successfully",
  });

  const form = useForm<z.infer<typeof createPostValidation>>({
    resolver: zodResolver(createPostValidation),
    defaultValues: {
      postType: "",
      category: "",
      content: "",
      image: undefined,
    },
  });
  const { control, handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (value) => {
    const { postType, category, content } = value;
    const base64Image = await fileToBase64(value?.image[0] as File);

    const postValue = {
      tag: postType,
      category,
      content,
      coverImg: base64Image,
    };

    mutate(postValue);
  });

  useEffect(() => {
    if (isSuccess) {
      reset();
      router.push("/my-post");
    }
  }, [isSuccess, reset, router]);

  return (
    <Form {...form}>
      <p className="text-center font-medium">Create Post</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField
          control={control}
          name="postType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Post Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Post Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Select Image"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Post Content"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Loading..." : "Create Post"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
