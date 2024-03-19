import type {Metadata} from "next";
import {ReactNode} from "react";
import "@/commons/styles/globals.css";
import {GlobalContextProvider} from "@/context/global";
import Favicon from "/public/img/favicon.ico";
import {getCurrentLocale} from "@/utils/lang";

export const metadata: Metadata = {
  title: "Beneficiary Portal",
  description: "OpenG2P self-service portal for Beneficiaries",
  icons: [{rel: "icon", url: Favicon.src}],
  viewport: {width: "device-width", initialScale: 1},
};

export default function RootLayout({children}: {children: ReactNode}) {
  const lang = getCurrentLocale();
  return (
    <html lang={lang}>
      <body>
        <main>
          <div className="bg-bgc font-fontcustom flex flex-col min-h-screen">
            <GlobalContextProvider>{children}</GlobalContextProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
