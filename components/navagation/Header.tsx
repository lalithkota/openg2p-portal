import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Language from './Language'
import Profile from './Profile'
import Search from './Search'
function Header() {
  return (
    <header>
      <nav className="bg-gray-200 rounded-lg border-gray-200 p-4 lg:px-4 py-2.5 mt-0 ml-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/selfservice" className="flex items-center">
            <img src="/img/logo@2x.png" className="mr-3 h-12 sm:h-12" alt="Selfservice Logo" />
          </Link>
          <div className="flex items-center lg:order-2">
            <Search />
            <Profile />
          </div>
        </div>
      </nav>
    </header>


  )
}

export default Header