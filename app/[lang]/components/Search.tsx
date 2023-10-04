import React from 'react'

function Search() {
    return (
        <form className="w-3/4  border border-gray-400 rounded-lg  " >
            <label htmlFor="default-search" className=" mb-2 w-full text-sm font-medium text-gray-900 sr-only ">Search</label>
            <div className="relative w-full">
                <div className=" absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-3 h-12 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full  p-2 pl-10 text-sm text-black-600  rounded-lg bg-white-200 focus:ring-gray-100 focus:border-transparent dark:bg-white-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black-800 dark:focus:ring-gray-500 dark:focus:border-transaparent outline-none" placeholder="Search" />
            </div>
        </form>
    )
}

export default Search;