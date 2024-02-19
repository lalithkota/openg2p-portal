"use client";

import {Avatar, Button} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import { prefixBaseApiPath } from "@/utils/path";
import Link from "next/link";
import Image from "next/image";

type LoginProvider = {
  id: number;
  name: string;
  type: string;
  displayName: string;
  displayIconUrl: string;
};

export default function LoginBox() {
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
              src="http://spar.openg2p.my/spar/img/logo@2x.png"
              priority={true}
              alt="Logo"
              width={300}
              height={300}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="login" className="font-bold text-white-600 ">Email or Phone</label>
            <input type="text" placeholder="Enter email or phone" name="login" id="login" className="w-full border border-solid border-white-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <label htmlFor="password" className="flex-1 font-bold text-white-600">Password</label>
              <div className="text-blue-600">
                <Link href="/web/reset_password">Reset Password</Link>
              </div>
              
            </div>
            <input type="password" placeholder="Enter password" name="password" id="password" className="w-full border border-solid border-white-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div className="mb-4 mt-2">
            <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2">Login</button>
          </div>
          <div className="mb-4 flex items-center justify-center">
            <span className="text-gray-600 p-2">OR</span>
          </div>
          <div className="mb-4">
            {loginProviders &&
              loginProviders.length !== 0 &&
              loginProviders.map((x) => (
                <div key={`provider-${x.id}`} className="m-2 text-center p-1">
                  <a href={prefixBaseApiPath(`/auth/getLoginProviderRedirect/${x.id}?redirect_uri=%2Fhome`)}>
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
