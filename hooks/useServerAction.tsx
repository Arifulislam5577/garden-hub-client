/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface UseServerActionProps {
  mutationFn: (data: FieldValues) => Promise<any>;
  mutationKey: string[];
  onSuccessMessage?: string;
  onErrorMessage?: string;
}

const useServerAction = ({
  mutationFn,
  mutationKey,
  onSuccessMessage = "Action successful",
  onErrorMessage = "Something went wrong",
}: UseServerActionProps) => {
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (data: FieldValues) => await mutationFn(data),
    onSuccess: () => {
      toast.success(onSuccessMessage);
    },
    onError: (error: any) => {
      toast.error(error?.message || onErrorMessage);
    },
  });

  return { ...mutation };
};

export default useServerAction;
