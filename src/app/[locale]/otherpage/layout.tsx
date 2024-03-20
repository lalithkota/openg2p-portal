import {ReactNode} from "react";
import {Header, Footer} from "@/components";

export default function CommonLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
