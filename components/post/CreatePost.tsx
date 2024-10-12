"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, FC, SetStateAction } from "react";
import CreatePostForm from "./CreatePostForm";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreatePost: FC<IProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(event) => event.preventDefault()}
        className="max-w-[35rem]"
      >
        <CreatePostForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
