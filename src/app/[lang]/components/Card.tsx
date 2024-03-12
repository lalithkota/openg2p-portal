import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'

export default async function Card ({
    params: { lang }
  }: {
    params: { lang: Locale }
  })  {

    const dictionary = await getDictionary(lang);
    if (!dictionary) {
      return null;
    }
    const {page} = dictionary

    return (
        <>
            <div className="w-full flex flex-col mx-auto max-w-screen-xl font-fontcustom mt-0 md:flex-row gap-8  m-4 p-6 md:space-x-6 ">
                <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow  dark:bg-brand rounded-lg">
                <div className="flex items-center justify-between pt-4 pl-4 mb-0 ">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">{page.card.title_a}</h5>

                    </div>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div className="flow-root">
                        <ul role="list" className="flex-col p-0 m-2 justify-center">
                            <li className="p-1 sm:py-4">
                                <div className="h-16 pl-0 bg-opacity-10 bg-white bg-no-repeat border  border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                                        <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/medical.png" alt="medical" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2 ">
                                        <Link href="#" className="text-sm font-medium text-gray-600  no-underline truncate">
                                            {page.card.heading_a1}
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {page.card.description_a1}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 p-2 ml-0 sm:py-4">
                                <div className="h-16 bg-opacity-10  bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                                        <Image className="w-1/2 h-1/2  square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/school_FILL0_wght400_GRAD0_opsz48.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2">
                                        <Link href="#" className="text-sm font-medium no-underline  text-gray-600 truncate">
                                            {page.card.heading_a2}
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {page.card.description_a2}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-auto mb-2">
                        <Link href={`/${lang}/programs`} className="text-sm font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline ">
                            {page.card.view_all}
                        </Link>
                    </div>
                </div>
                <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow  dark:bg-brand rounded-lg">
                    <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">{page.card.title_b}</h5>

                    </div>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div className="flow-root">
                        <ul role="list" className="flex-col p-0 m-2 justify-center">
                            <li className="p-1 ml-0 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0 ">
                                        <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/person_filled_FILL0_wght400_GRAD0_opsz48.png" alt="medical" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2 ">
                                        <Link href="#" className="text-sm font-medium no-underline  text-gray-600 truncate">
                                            {page.card.heading_b1}
                                        </Link>
                                        <p className="text-sm text-gray-500  truncate dark:text-gray-400">
                                            {page.card.description_b1}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 p-2 ml-0 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                                        <Image className="w-1/2 h-1/2  square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/school_FILL0_wght400_GRAD0_opsz48.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2">
                                        <Link href="#" className="text-sm  no-underline  font-medium text-gray-600 truncate">
                                            {page.card.heading_b2}
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {page.card.description_b2}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-auto ">
                        <Link href={`/${lang}/forms`}className="text-sm font-medium text-blue-600 hover:underline no-underline  dark:text-blue-500">
                            {page.card.view_all}
                        </Link>

                    </div>
                </div>

                <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow  dark:bg-brand rounded-lg">
                    <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">{page.card.title_c}</h5>

                    </div>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div className="flow-root">
                        <ul role="list" className="flex-col p-0 m-2 justify-center">
                            <li className="p-1 ml-0 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0 ">
                                        <Image className="w-1/2 h-1/2 square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/applications.png" alt="medical" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2 ">
                                        <Link href={`/${lang}/applications`} className="text-sm font-medium no-underline  text-gray-600 truncate">
                                            {page.card.heading_c1}
                                        </Link>
                                        <p className="text-sm text-gray-500  truncate dark:text-gray-400">
                                            {page.card.description_c1}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 p-2 ml-0 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                                        <Image className="w-1/2 h-1/2  square-full m-3 max-w-[40%] max-h-[40%]" src="http://spar.openg2p.my/spar/img/benefits.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2">
                                        <Link href={`/${lang}/benefits`} className="text-sm  no-underline  font-medium text-gray-600 truncate">
                                            {page.card.heading_c2}
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {page.card.description_c2}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow dark:bg-brand rounded-lg">
                    <div className="flex items-center justify-between pt-4 pl-4 mb-2 ">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">{page.card.title_c}</h5>

                    </div>
                    <hr className="border-t mx-0 border-gray-400" /> */}
                    {/* <Link href={`/${lang}/applications`} className="text-sm font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline">
                            {page.card.applications}
                    </Link>
                    <Link href={`/${lang}/benefits`} className="text-sm font-medium text-blue-600 dark:text-blue-500 no-underline hover:underline">
                            {page.card.benefits}
                    </Link> */}
                {/* </div> */}
            </div>
        </>
    )
}
