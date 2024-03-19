import Favicon from "/public/img/favicon.ico";
import "@/commons/styles/globals.css";
import type {Metadata} from "next";
import {Locale, i18n} from "@/i18n.config";
import {GlobalContextProvider} from "@/context/global";

export const metadata: Metadata = {
  title: "Beneficiary Portal",
  description: "OpenG2P self-service portal for Beneficiaries",
  icons: [{rel: "icon", url: Favicon.src}],
  viewport: {width: "device-width", initialScale: 1},
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({lang: locale}));
}

export default function RootLayout({children, params}: {children: React.ReactNode; params: {lang: Locale}}) {
  return (
    <html lang={params.lang}>
      <body className="bg-bgc font-fontcustom flex flex-col min-h-screen">
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </body>
    </html>
  );
}
