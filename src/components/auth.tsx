"use client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {useAuth} from "@/context/global";
import {prefixBaseApiPath} from "@/utils/path";

// On client side directly call this function. Example:
// AuthUtil({failedRedirectUrl: "/en/home"});
// On server side render this element. Example:
// <AuthUtil failedRedirectUrl="/en/home" />
export function AuthUtil(params: {successRedirectUrl?: string; failedRedirectUrl?: string}) {
  const auth = useAuth();
  const {push} = useRouter();

  function checkAndRedirect() {
    if (params.successRedirectUrl && auth.profile) {
      return push(params.successRedirectUrl);
    } else if (params.failedRedirectUrl && !auth.profile) {
      return push(params.failedRedirectUrl);
    }
  }

  useEffect(() => {
    if (typeof auth.profile !== "undefined") {
      return checkAndRedirect();
    }
    fetch(prefixBaseApiPath("/auth/profile"))
      .then((res) => {
        if (res.ok) {
          res
            .json()
            .then((resJson) => {
              auth.profile = resJson;
              auth.setProfile(resJson);
            })
            .catch((err) => {
              console.log("Error Getting profile json", err);
            })
            .finally(checkAndRedirect);
        } else {
          console.log("Error Getting profile, res not ok");
          checkAndRedirect();
        }
      })
      .catch((err) => {
        console.log("Error Getting profile", err);
        checkAndRedirect();
      });
    // TODO: Fix this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return <></>;
}
