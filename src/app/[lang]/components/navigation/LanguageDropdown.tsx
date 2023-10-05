"use client"

import { Fragment } from 'react';
import {Menu,Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/solid'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function LanguageDropDown(): JSX.Element {
  const pathName = usePathname()
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  //const [selectedLanguage, setSelectedLanguage] = useState(languages[0])


  return (
    <Menu as="div" className="relative inline-block text-left w-[120px]  ">
      <div>
        <Menu.Button className="flex justify-between items-center w-full gap-x-2 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img
            src="/img/flag_en.png " alt="English" loading='lazy'
            
          />
          <span className='flag-icon flag-icon-gb'></span>
          <span>English</span>
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
        <Menu.Items className="absolute flex-col right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 flex-col items-center">
            <Menu.Item >
              {({ active }) => (
                <Link
                href={redirectedPathName('en')}
                  data-url_code="en"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    ' px-4 py-2 text-sm flex items-center gap-2'
                  )}
                >
                  <img src="/img/flag_en.png" alt="English" />
                  <span>English</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={redirectedPathName('fr')}
                  data-url_code="fr"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'px-4 py-2 text-sm flex items-center gap-2'
                  )}
                >
                  <img src="/img/flag_fr.png" alt="Français"  />
                  <span>Français</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={redirectedPathName('tl')}
                  data-url_code="tl"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    ' px-4 py-2 text-sm flex items-center gap-2'
                  )}
                >
                  <img
                    src="/img/flag_tl.png" alt="Filipino" />
                  <span>Filipino</span>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

    // <div className="relative inline-block text-left w-[120px]">
    //   <Listbox value={selectedLanguage} onChange={setSelectedLanguage}>
    //     <div className="relative mt-1">
    //       <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
    //         <span className="block truncate">{selectedLanguage.name}</span>
    //         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
    //           <ChevronDownIcon
    //             className="h-5 w-5 text-gray-400"
    //             aria-hidden="true"
    //           />
    //         </span>
    //       </Listbox.Button>
    //       <Transition
    //         as={Fragment}
    //         leave="transition ease-in duration-100"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
    //           {languages.map((language, languageIdx) => (
    //             <Listbox.Option
    //               key={languageIdx}
    //               className={({ active }) =>
    //                 `relative cursor-default select-none py-2 pl-10 pr-4 ${
    //                   active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
    //                 }`
    //               }
    //               value={language}
    //             >
    //               {({ selected }) => (
    //                 <>
    //                   <Link
    //                     href={redirectedPathName(language.code)}
    //                     className={`block truncate ${
    //                       selected ? 'font-medium' : 'font-normal'
    //                     }`}
    //                   >
    //                     <img src={`/img/flag_${language.code}.png`} alt={language.name} />
    //                     <span>{language.name}</span>
    //                   </Link>
    //                   {selected ? (
    //                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
    //                       <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                     </span>
    //                   ) : null}
    //                 </>
    //               )}
    //             </Listbox.Option>
    //           ))}
    //         </Listbox.Options>
    //       </Transition>
    //     </div>
    //   </Listbox>
    // </div>
  )
}
