"use client";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default AppProvider;
