import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LanguageDropDown from './LanguageDropdown'
import { Search } from '..'
import ProfileDropDown from './ProfileDropdown'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'


export default async function Header({ lang }: { lang: Locale }) {
  const dictionary = await getDictionary(lang);
  if (!dictionary) {
    return null;
  }
  const { page } = dictionary
  return (
    <header>
      <nav className="w-full font-fontcustom bg-no-repeat shadow-md opacity-100  bg-brand border-gray-200 p-1 lg:px-4  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl ">
          <Link href={`/${lang}/home`} className=" m-3 flex items-center">
            <Image
              src="http://spar.openg2p.my/spar/img/logo@2x.png"
              priority={true}
              alt="Logo"
              width={300}
              height={300}
            />
          </Link>

          <div className="flex items-center gap-2 lg:order-2 mr-6">
            <Search />
            <LanguageDropDown/>
            <ProfileDropDown lang={ lang} />
          </div>
        </div>
      </nav>
    </header>


  )
}
