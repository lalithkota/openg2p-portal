import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
function Profile() {
  return (
    <div>
      <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-gray-900 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-900 dark:hover:bg-ornage-400 dark:focus:ring-gray-400" type="button">Account <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg></button>
      <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
          <li>
            <Link href="/selfservice/myprofile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Profile</Link>
          </li>
          <li>
            <Link href="/web/session/logout?redirect=/selfservice/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
          </li>
        </ul>
      </div>

    </div>

  )
}

export default Profile