import Link from "next/link";
import {AuthUtil} from "@/components/auth";
import LoginBox from "./loginbox";
import {useTranslations} from "@i18n";

export default function Login() {
  const t = useTranslations();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-7">
      <AuthUtil successRedirectUrl="/home" />
      <LoginBox />
      <div className="border-0">
        <div className="login-bottom-text text-center mt-4">
          {t("Facing any challenges?") + " "}
          <Link href="#" className="text-blue-500">
            {t("Help")}
          </Link>
        </div>
      </div>
    </div>
  );
}
