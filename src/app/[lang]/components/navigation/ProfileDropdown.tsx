"use client"

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@i18n.config';
import { prefixBaseApiPath } from "@/utils/path";
import { authContext } from "../auth";
import { useRouter } from "next/navigation";
import {
  Avatar} from "@mui/material";
import { useState } from 'react';

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileDropDown({ lang }: { lang: Locale }): JSX.Element {

  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const logoutHandler = () => {

    fetch(prefixBaseApiPath("/auth/logout"), {
      method: "POST",
    }).finally(() => {
      authContext.profile = null;
      router.replace("/en/login");
    });
  };
  return (
    <Menu as="div" className="print:hidden relative inline-block text-left border-none">
      <div >
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900  border-transparent  ">
          <Avatar
            src={authContext.profile ? authContext.profile.picture : ""}
            sx={{ width: 55, height: 55 }}
          />
          <ChevronDownIcon className="-mr-1 mt-3 h-5 w-10 text-gray-400" aria-hidden="true" />
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
          <div className="py-1">
            <Menu.Item >
              {({ active }) => (
                <Link 
                  href={`/${lang}/myprofile`}
                  onClick={handleClick}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  My profile
                </Link>
              )}
            </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                  type="submit" onClick={logoutHandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Log out
                  </button>
                )}
              </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

