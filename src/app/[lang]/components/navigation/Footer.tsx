import React from 'react'
import Link from 'next/link'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import Image from 'next/image'


export default async function Footer({ lang }: { lang: Locale }) {
    const dictionary = await getDictionary(lang);
    if (!dictionary) {
        return null;
    }
    const { footer } = dictionary


    return (
        <footer className='mt-auto'>
            <div className=" w-full font-fontcustom bg-no-repeat shadow-md opacity-100  bg-brand border-gray-200 p-1 lg:px-4 print:hidden ">
                <div className="flex flex-wrap justify-between items-center  mx-auto  max-w-screen-xl ">
                    <Link href={`/${lang}/home`}  className=" m-3 flex items-center">
                        <Image
                            src="http://spar.openg2p.my/spar/img/logo@2x.png"
                            priority={true}
                            alt="Logo"
                            width={300}
                            height={300}
                        />
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href={`/${lang}/aboutus`} className="mr-4 hover:underline text-gray-500 no-underline md:mr-6 ">{footer.about}</Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/contactus`} className="mr-4 hover:underline text-gray-500 no-underline md:mr-6">{footer.contact}</Link>
                        </li>
                        <li>
                            <Link href={`/${lang}/otherpage`} className="mr-4 hover:underline text-gray-500 no-underline md:mr-6 ">{footer.others}</Link>
                        </li>
                    </ul>

                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-200 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 National Social Benefits Portal. All rights reserved.</span>
            </div>
        </footer>
    )
}
