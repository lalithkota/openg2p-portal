import {AuthUtil} from "@/components/auth";
import LoginBox from "./loginbox";
import Link from "next/link";
import {Locale} from "@/i18n.config";
export default async function Login({params: {lang}}: {params: {lang: Locale}}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-7">
      <AuthUtil successRedirectUrl={`/${lang}/home`} />
      <LoginBox />
      <div className="border-0">
        <div className="login-bottom-text text-center mt-4">
          Facing any challenges?{" "}
          <Link href="#" className="text-blue-500">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
