"use client";
import Image from "next/image";
import {SyntheticEvent, useEffect, useState} from "react";
import {Avatar, Button} from "@mui/material";
import {useTranslations} from "@/i18n";
import {prefixBaseApiPath, prefixBasePath} from "@/utils/path";

type LoginProvider = {
  id: number;
  name: string;
  type: string;
  displayName: string;
  displayIconUrl: string;
};

export default function LoginBox() {
  const t = useTranslations();

  function handleLoginSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  const [loginProviders, setLoginProviders] = useState<LoginProvider[]>([]);

  function getLoginProviders() {
    fetch(prefixBaseApiPath(`/auth/getLoginProviders`)).then((res) => {
      res.json().then((resJson: {loginProviders: LoginProvider[]}) => {
        setLoginProviders(resJson.loginProviders);
      });
    });
  }

  useEffect(getLoginProviders, []);

  return (
    <div className=" relative flex place-items-center w-full justify-center min-h-screen">
      <div className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg lg:w-auto lg:rounded-xl lg:border lg:p-6">
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
            <label htmlFor="login" className="font-bold text-white-600 ">
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
              <label htmlFor="password" className="flex-1 font-bold text-white-600">
                {t("Password")}
              </label>
              <div className="text-blue-600">
                <a href="/web/reset_password">{t("Reset Password")}</a>
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
            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">
              {t("Login")}
            </button>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <span className="text-gray-600 p-2">{t("OR")}</span>
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
