import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function Footer() {
    return (
        <footer className="bg-brand rounded-lg w-full mx-autobg-no-repeat shadow-md opacity-100 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/selfservice" className="flex items-center mb-4 sm:mb-0">
                        <img src="/img/logo@2x.png" className="h-12 mr-3" alt="main logo"/>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="/selfservice/aboutus" className="mr-4 hover:underline md:mr-6 ">About</Link>
                        </li>
                        <li>
                            <Link href="/selfservice/contactus" className="mr-4 hover:underline md:mr-6">Contact Us</Link>
                        </li>
                        <li>
                            <Link href="/selfservice/otherpage" className="mr-4 hover:underline md:mr-6 ">Others</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 National Social Benefits Portal. All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer