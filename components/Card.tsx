import React from "react";
import Image from "next/image";
import Link from "next/link";
const Card = () => {
    return (
        <>
            <div className="flex flex-col mt-24 md:flex-row gap-8 mb-8 m-6 md:space-x-6">
                <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow sm:p-8 dark:bg-brand rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">All Programs</h5>

                    </div>
                    <hr className="border-t  border-gray-200 my-4" />
                    <div className="flow-root">
                        <ul role="list">
                            <li className="py-3 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0  ">
                                        <Image className="w-1/2 h-1/2 square-full m-3" src="/img/medical.png" alt="medical" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2 ">
                                        <Link href="#" className="text-sm font-medium text-gray-600 truncate">
                                            Healthcare
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            30+ Schemes available
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                                        <Image className="w-1/2 h-1/2  square-full m-3" src="/img/school_FILL0_wght400_GRAD0_opsz48.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href="#" className="text-sm font-medium text-gray-600 truncate">
                                            Education
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            55+ Schemes available
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <a href="/selfservice/programs" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a>
                    </div>
                </div>
                <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow sm:p-8 dark:bg-brand rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">Other Services</h5>

                    </div>
                    <hr className="border-t border-gray-200 my-4" />
                    <div className="flow-root">
                        <ul role="list">
                            <li className="py-3 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-start space-x-4 ">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0 ">
                                        <Image className="w-1/2 h-1/2 square-full m-3" src="/img/person_filled_FILL0_wght400_GRAD0_opsz48.png" alt="medical" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0 mt-2 ">
                                        <Link href="#" className="text-sm font-medium text-gray-600 truncate">
                                            Help
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Tap here for assistance
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="h-16 bg-opacity-10 bg-white bg-no-repeat border border-gray-300 rounded-lg opacity-100 flex items-center space-x-4">
                                    <div className="bg-opacity-10 bg-gray-600 bg-no-repeat bg-0 rounded-lg opacity-100 w-12 h-12 m-2 flex-shrink-0">
                                        <Image className="w-1/2 h-1/2  square-full m-3" src="/img/school_FILL0_wght400_GRAD0_opsz48.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href="#" className="text-sm font-medium text-gray-600 truncate">
                                            FAQ
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Tap to know more
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="mx-auto">
                        <a href="/selfservice/programs" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a>
                    </div>
                </div>
                <div className=" flex flex-col w-full bg-brand border border-gray-200 square-lg shadow sm:p-8 dark:bg-brand rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bol d leading-none text-gray-600">Entitlements</h5>

                    </div>
                    <hr className="border-t border-gray-200 my-4" />
                </div>
            </div>
        </>
    )
}

export default Card