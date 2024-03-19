import createMiddleware from "next-intl/middleware";
import {getSupportedLocales} from "@/utils/lang";

export default createMiddleware({
  locales: getSupportedLocales(),
  defaultLocale: "en",
});

export const config = {
  // TODO: template literals not supported here
  // matcher: ["/", `/(${getSupportedLocales().join("|")})/:path*`],
  matcher: ["/", "/(en|fr|es|tl|ar)/:path*"],
};
