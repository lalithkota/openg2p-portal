import React from 'react'
import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Image from 'next/image'


export default async function Footer({ lang }: { lang: Locale }) {
  const {footer} = await getDictionary(lang)

    return (
        <footer className="bg-brand font-fontcustom rounded-lg w-full opacity-100 ">
            <div className="w-full max-w-screen-xl mx-0 p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="" className="flex items-center mb-4 sm:mb-0">  
                        {/* <Image src="/img/logo.png" className="h-12 mr-3" alt="main logo" width={100} height={300}/> */}
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href={`/${lang}/aboutus`} className="mr-4 hover:underline md:mr-6 ">{footer.about}</Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/contactus`} className="mr-4 hover:underline md:mr-6">{footer.contact}</Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/otherpage`} className="mr-4 hover:underline md:mr-6 ">{footer.others}</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 National Social Benefits Portal. All rights reserved.</span>
            </div>
        </footer>
    )
}
