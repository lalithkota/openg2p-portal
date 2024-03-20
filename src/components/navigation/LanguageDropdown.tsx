"use client";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {Fragment} from "react";
import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/outline";
import {prefixBasePath} from "@/utils/path";
import {getSupportedLocales} from "@/utils/lang";

export default function LanguageDropDown() {
  const currentLocale = useLocale();
  const supportedLocales = getSupportedLocales();
  const pathAbs = usePathname();
  const t = useTranslations();

  return (
    <Menu as="div" className="relative inline-block text-left w-[120px] print:hidden">
      <div>
        <Menu.Button className="flex border border-gray-400 justify-between items-center w-full gap-x-2 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
          <Image
            src={prefixBasePath(t(`@flag_url_${currentLocale}`))}
            alt={t(`@language_title_${currentLocale}`)}
            className="mr-2"
            width={20}
            height={20}
          />
          <span>{t(`@language_title_${currentLocale}`)}</span>
          <ChevronDownIcon className="mr-1 h-5 w-10 text-gray-400 hide" aria-hidden="true" />
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
        <Menu.Items className="absolute flex-col right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-gray-400  focus:outline-none">
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
                      width={50}
                      height={50}
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
