import { ReactNode } from "react";
import { Navbar } from "../Navbar/Navbar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};
