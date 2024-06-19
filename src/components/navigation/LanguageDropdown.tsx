"use client";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {prefixBasePath} from "@/utils/path";
import {getSupportedLocales} from "@/utils/lang";

export default function LanguageDropDown() {
  const currentLocale = useLocale();
  const supportedLocales = getSupportedLocales();
  const pathAbs = usePathname();
  const t = useTranslations();

  return (
    <Menu as="div" className="relative inline-block text-left w-[300px] print:hidden">
      <div>
        <Menu.Button
          className="flex border border-gray-400 justify-between items-center w-full gap-x-3 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 "
          style={{gap: "6px"}}
        >
          <Image
            src={prefixBasePath(t(`@flag_url_${currentLocale}`))}
            alt={t(`@language_title_${currentLocale}`)}
            className="mr-1 w-6 h-6 ml-1"
            width={20}
            height={20}
            style={{marginLeft: "5px"}}
          />
          <span className="flex-grow text-xs mr-1">{t(`@language_title_${currentLocale}`)}</span>
          <span
            className="h-4 w-4 text-gray-700"
            aria-hidden="true"
            style={{fontSize: "80%", marginRight: "5px"}}
          >
            ▼
          </span>{" "}
          {/* Chevron Down Character */}
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
        <Menu.Items
          className="absolute flex-col right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-gray-400  focus:outline-none"
          style={{zIndex: 1000}}
        >
          <div className="py-1 flex-col items-center">
            {supportedLocales.map((locale) => (
              <Menu.Item key={`locale-${locale}`}>
                {({active}) => (
                  <Link
                    href={pathAbs.replace(currentLocale, locale)}
                    className={
                      (active ? "bg-gray-100 text-gray-900" : "text-gray-700") +
                      " px-4 py-2 text-sm flex items-center gap-2"
                    }
                  >
                    <Image
                      src={prefixBasePath(t(`@flag_url_${locale}`))}
                      alt={t(`@language_title_${locale}`)}
                      width={20}
                      height={20}
                    />
                    <span>{t(`@language_title_${locale}`)}</span>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
