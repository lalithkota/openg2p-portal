import {AuthUtil} from "@/components/auth";

export default function RootPage() {
  const authUtilProps = {
    successRedirectUrl: `/home`,
    failedRedirectUrl: `/login`,
  };
  return (
    <div>
      <AuthUtil {...authUtilProps} />
    </div>
  );
}
