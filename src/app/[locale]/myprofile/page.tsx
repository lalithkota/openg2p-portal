"use client";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {AuthUtil} from "@/components/auth";
import {useAuth} from "@/context/global";

export default function Profile() {
  const lang = useLocale();
  AuthUtil({failedRedirectUrl: `/${lang}/login`});

  const {profile} = useAuth();
  const t = useTranslations();

  return (
    <div className="rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <div className="mx-auto max-w-screen-xl">
        <div
          style={{
            textAlign: "left",
            font: "normal normal 600 16px/20px Inter",
            letterSpacing: "0px",
            color: "#484848",
            opacity: "1",
            top: "118px",
            left: "139px",
            width: "135px",
            height: "26px",
          }}
        >
          {t("My Profile")}
        </div>
        <div className="flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl">
          <Link
            href={`/${lang}/home`}
            className="flex items-center text-blue-900"
            style={{
              top: "154px",
              left: "139px",
              width: "40px",
              height: "17px",
              textAlign: "left",
              font: "normal normal 600 14px/17px Inter",
              letterSpacing: "0px",
              color: "#494DAF",
              opacity: "1",
              whiteSpace: "nowrap",
            }}
          >
            {" " + t("Home") + " "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p
            className="m-0"
            style={{
              top: "154px",
              left: "317px",
              width: "115px",
              height: "17px",
              textAlign: "left",
              font: "normal normal 600 14px/17px Inter",
              letterSpacing: "0px",
              color: "#848484",
              opacity: "1",
              whiteSpace: "nowrap",
            }}
          >
            {t("My Profile")}
          </p>
        </div>
      </div>
      <div className="bg-brand container w-full mx-auto shadow-md pb-0 rounded-lg my-4 p-6 ">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="font-semibold">{t("Personal Information")}</div>
          <div></div> {/* Empty cell for grid alignment */}
          <div>{t("Given Name")}</div>
          <div>{profile?.given_name}</div>
          <div>{t("Additional Name")}</div>
          <div>{profile?.addl_name}</div>
          <div>{t("Family Name")}</div>
          <div>{profile?.family_name}</div>
          <div className="font-semibold">{t("Contact Information")}</div>
          <div></div> {/* Empty cell for grid alignment */}
          <div>{t("Email")}</div>
          <div>{profile?.email}</div>
          <div>{t("Phone")}</div>
          <div>{profile?.phone_numbers?.map((phone) => phone.phone_no).join(", ")}</div>
          <div className="font-semibold">{t("Demographic Details")}</div>
          <div></div> {/* Empty cell for grid alignment */}
          <div>{t("Gender")}</div>
          <div>{profile?.gender}</div>
          <div>{t("Birthdate")}</div>
          <div>{profile?.birthdate}</div>
        </div>
      </div>
    </div>
  );
}
