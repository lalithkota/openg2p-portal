import type {Metadata, Viewport} from "next";
import {NextIntlClientProvider, useMessages} from "next-intl";
import {ReactNode} from "react";
import "@/commons/styles/globals.css";
import {GlobalContextProvider} from "@/context/global";
import Favicon from "/public/img/favicon.ico";

export const metadata: Metadata = {
  title: "Beneficiary Portal",
  description: "OpenG2P self-service portal for Beneficiaries",
  icons: [{rel: "icon", url: Favicon.src}],
};

export const viewport: Viewport = {width: "device-width", initialScale: 1};

export default function RootLayout({
  children,
  params: {locale},
}: {
  children: ReactNode;
  params: {locale: string};
}) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <main>
          <div className="bg-bgc font-fontcustom flex flex-col min-h-screen">
            <NextIntlClientProvider locale={locale} messages={messages}>
              <GlobalContextProvider>{children}</GlobalContextProvider>
            </NextIntlClientProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
