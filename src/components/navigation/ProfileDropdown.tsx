"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {Avatar} from "@mui/material";
import {useAuth} from "@/context/global";
import {prefixBaseApiPath} from "@/utils/path";

export default function ProfileDropDown() {
  const lang = useLocale();
  const t = useTranslations();
  const {profile, setProfile} = useAuth();
  const router = useRouter();

  const logoutHandler = () => {
    fetch(prefixBaseApiPath("/auth/logout"), {
      method: "POST",
    }).finally(() => {
      setProfile(null);
      router.push(`/${lang}/login`);
    });
  };
  return (
    <Menu as="div" className="print:hidden relative inline-block text-left border-none">
      <div>
        <Menu.Button className="inline-flex w-full justify-center px-3 py-2 text-sm font-semibold text-gray-900 border-transparent mt-1">
          <div className="flex items-center gap-2">
            <Avatar src={profile?.picture} sx={{width: 60, height: 60}} />
            <span className="h-4 w-4 text-gray-700" aria-hidden="true">
              ▼
            </span>{" "}
            {/* Chevron Down Character */}
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" style={{whiteSpace: "nowrap"}}>
            <Menu.Item>
              {({active}) => (
                <Link
                  href={`/${lang}/myprofile`}
                  className={
                    (active ? "bg-gray-100 text-gray-900" : "text-gray-700") + " block px-4 py-2 text-sm"
                  }
                >
                  {t("My Profile")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({active}) => (
                <button
                  type="submit"
                  onClick={logoutHandler}
                  className={
                    (active ? "bg-gray-100 text-gray-900" : "text-gray-700") +
                    " block w-full px-4 py-2 text-left text-sm"
                  }
                >
                  {t("Log out")}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
