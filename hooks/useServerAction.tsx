import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface UseServerActionProps {
  mutationFn: (data?: FieldValues | string) => Promise<any>;
  mutationKey: string[];
  onSuccessMessage?: string;
  onErrorMessage?: string;
}

const useServerAction = ({
  mutationFn,
  mutationKey,
  onSuccessMessage,
  onErrorMessage = "Something went wrong",
}: UseServerActionProps) => {
  const mutation = useMutation({
    mutationKey,
    mutationFn: async (data?: FieldValues | string) => await mutationFn(data),
    onSuccess: (data) => {
      toast.success(onSuccessMessage ?? data?.message);
    },
    onError: (error: any) => {
      toast.error(error?.message || onErrorMessage);
    },
  });

  return { ...mutation };
};

export default useServerAction;
