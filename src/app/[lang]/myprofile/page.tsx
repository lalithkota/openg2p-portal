"use client";

import React from "react";
import Link from "next/link";
import {Locale} from "@/i18n.config";
import {AuthUtil} from "@/components/auth";
import {useAuth} from "@/context/global";

export default function Profile({params: {lang}}: {params: {lang: Locale}}) {
  const {profile} = useAuth();

  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <AuthUtil failedRedirectUrl={`/${lang}/login`} />
      <div className="mx-auto max-w-screen-xl">
        <div className="text-gray-700 text-xl ">Profile</div>
        <div className="flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl">
          <Link href={`/${lang}/programs`} className="flex items-center text-blue-900">
            {" "}
            Home{" "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p className="m-0">My Profile </p>
        </div>
      </div>
      <div className="m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
        <div className="grid grid-rows-3 grid-flow-col gap-10 m-0">
          <div>Name</div>
          {profile?.given_name}
          <div>Last Name</div>
          {profile?.family_name}
          <div>Gender:</div>
          {profile?.gender}
          <div>Birthdate:</div>
          {profile?.birthdate}
          <div>Email:</div>
          {profile?.email}
          <div>Phone:</div>
          {profile?.phone_number}
        </div>
      </div>
    </div>
  );
}
