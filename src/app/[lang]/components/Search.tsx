import React from 'react'

function Search() {
    return (
        <form className="w-3/4 gap-3 border border-gray-400 rounded-lg relative">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search
            </label>
            <div className="flex items-center">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                <input
                    type="search"
                    id="default-search"
                    className="block pl-10 ml-7 p-2 text-sm text-black-600 rounded-lg bg-white-200 focus:ring-gray-100 focus:border-transparent dark:bg-white-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black-800 dark:focus:ring-gray-500 dark:focus:border-transparent outline-none flex-grow"
                    placeholder="Search"
                />
            </div>
        </form>




    )
}

export default Search;