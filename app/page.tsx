import { ReactNode } from "react";

export default function Home({ children }: Readonly<{ children: ReactNode }>) {
  return <section>{children}</section>;
}
