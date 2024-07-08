import {ReactNode} from "react";
import {Header, Footer} from "@/components";
import ChatIcon from "@/components/ChatIcon";

export default function CommonLayout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      {children}
      <ChatIcon />
      <Footer />
    </>
  );
}
