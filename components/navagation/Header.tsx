"use"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LanguageDropDown from './LanguageDropdown'
import Search from './Search'
import ProfileDropDown from './ProfileDropdown'
function Header() {
  return (
    <header >
      <nav className="w-full  bg-no-repeat shadow-md opacity-100  rounded-lg bg-brand border-gray-200 p-4 lg:px-4  ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/selfservice" className=" m-3 flex items-center">
            <img src="/img/logo@2x.png" className="mr-3 h-12 w-auto ml-3  sm:h-12" alt="Selfservice Logo" />
          </Link>
          <div className="flex items-center gap-2 lg:order-2 mr-6">
            <Search />
            <LanguageDropDown/>
            <ProfileDropDown />
          </div>
        </div>
      </nav>
    </header>


  )
}

export default Header