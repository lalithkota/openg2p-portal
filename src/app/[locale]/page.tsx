import {useLocale} from "next-intl";
import {AuthUtil} from "@/components/auth";

export default function RootPage() {
  const lang = useLocale();
  const authUtilProps = {
    successRedirectUrl: `/${lang}/home`,
    failedRedirectUrl: `/${lang}/login`,
  };
  return (
    <div>
      <AuthUtil {...authUtilProps} />
    </div>
  );
}
