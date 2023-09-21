import React from "react";
import Image from "next/image";
import Link from "next/link";
const Cardtest = () => {
    return (
        <>
            <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
                <div className=" flex flex-col w-full max-w-md p-4 bg-black border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bol d leading-none text-gray-900 dark:text-white">All Programs</h5>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src="/img/medical.png" alt="medical" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href="#"  className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Healthcare
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            30+ Schemes available
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src="/img/school_FILL0_wght400_GRAD0_opsz48.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href="#"  className="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                </div>
                <div className=" flex flex-col  w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bol d leading-none text-gray-900 dark:text-white">Other Services</h5>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a>
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src="/img/person_filled_FILL0_wght400_GRAD0_opsz48.png" alt="person" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href="#"  className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        Help 
                                        </Link>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Tap here for assistance
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <Image className="w-8 h-8 rounded-full" src="/img/school_FILL0_wght400_GRAD0_opsz48.png" alt="school" width={100} height={300} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link href="#"  className="text-sm font-medium text-gray-900 truncate dark:text-white">
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
                </div>
                <div className=" flex flex-col  w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bol d leading-none text-gray-900 dark:text-white">Entitlements</h5>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Cardtest