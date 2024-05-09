"use client";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {SyntheticEvent, useEffect, useState} from "react";
import {Avatar, Button} from "@mui/material";
import {prefixBaseApiPath, prefixBasePath} from "@/utils/path";

type LoginProvider = {
  id: number;
  name: string;
  type: string;
  displayName: string | any;
  displayIconUrl: string;
};

export default function LoginBox() {
  const locale = useLocale();
  const t = useTranslations();

  function handleLoginSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  const [loginProviders, setLoginProviders] = useState<LoginProvider[]>([]);

  function getLoginProviders() {
    fetch(prefixBaseApiPath(`/auth/getLoginProviders`)).then((res) => {
      res.json().then((resJson: {loginProviders: LoginProvider[]}) => {
        resJson.loginProviders.map((x) => {
          if (typeof x.displayName !== "string") {
            const displayNameLocale = Object.keys(x.displayName).find((y) => y.startsWith(locale));
            if (displayNameLocale && displayNameLocale in x.displayName) {
              x.displayName = x.displayName[displayNameLocale];
            } else {
              x.displayName = "";
            }
          }
        });
        setLoginProviders(resJson.loginProviders);
      });
    });
  }

  useEffect(getLoginProviders, [locale]);

  return (
    <div
      className=" relative flex place-items-center w-full justify-center min-h-screen"
      style={{backgroundColor: "#f4f7ff"}}
    >
      <div
        className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg lg:w-auto lg:rounded-xl lg:border lg:p-6"
        style={{borderRadius: "18px", backgroundColor: "ffffff"}}
      >
        <form onSubmit={handleLoginSubmit} className=" mt-0 m-0">
          <div className="m-8 w-max h-max ">
            <Image
              src={prefixBasePath("/img/logo@2x.png")}
              priority={true}
              alt="Logo"
              width={300}
              height={300}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="login"
              className="font-bold text-white-600 "
              style={{
                fontWeight: "500",
                letterSpacing: "0px",
                color: "#000000",
                opacity: 1,
              }}
            >
              {t("Email or Phone")}
            </label>
            <input
              type="text"
              placeholder={t("Enter email or phone")}
              name="login"
              id="login"
              className="w-full border border-solid border-white-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label
                htmlFor="password"
                className="flex-1 font-bold text-white-600"
                style={{
                  fontWeight: "500",
                  letterSpacing: "0px",
                  color: "#000000",
                  opacity: 1,
                }}
              >
                {t("Password")}
              </label>
              <div className="" style={{color: "#6569C7", fontWeight: "500", letterSpacing: "0px"}}>
                <a href="/selfservice/en/login">{t("Reset Password")}</a>
              </div>
            </div>
            <input
              type="password"
              placeholder={t("Enter password")}
              name="password"
              id="password"
              className="w-full border border-solid border-white-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="mb-4 mt-2">
            <button
              type="submit"
              className="w-full text-white rounded-md py-2"
              style={{background: "#6569C7", height: "44px"}}
            >
              {t("Login")}
            </button>
          </div>
          <div className="mb-4 flex items-center justify-center" style={{position: "relative"}}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "#4B55",
                top: "50%",
              }}
            />
            <span
              style={{
                padding: "0 10px",
                backgroundColor: "#FFF",
                position: "relative",
                zIndex: 1,
              }}
              className="text-gray-600"
            >
              {t("OR")}
            </span>
          </div>
          <div className="mb-4">
            {loginProviders &&
              loginProviders.length !== 0 &&
              loginProviders.map((x) => (
                <div key={`provider-${x.id}`} className="m-2 text-center p-1">
                  <a href={prefixBaseApiPath(`/auth/getLoginProviderRedirect/${x.id}`)}>
                    <Button
                      startIcon={<Avatar variant="square" src={x.displayIconUrl} />}
                      className="text-black-500"
                      variant="outlined"
                      fullWidth
                      style={{borderColor: "#e0dfe0"}}
                    >
                      {x.displayName}
                    </Button>
                  </a>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}
