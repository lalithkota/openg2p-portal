import React from 'react'
import Link from 'next/link'
import { fetchPrograms } from '../../../utils'
import { HomeProps } from '../../../types';
import Loading from '../loading';
import { Locale } from '../../../i18n.config'
import { getDictionary } from '../../../lib/dictionary'
import { Suspense } from 'react';


export default async function ProgrmPage({ searchParams, params: { lang } }: {
  searchParams: HomeProps,
  params: { lang: Locale }
}) {

  const programs = await fetchPrograms({
    program: searchParams.program || '',
  })
  const isDataEmpty = !Array.isArray(programs) || programs.length < 1 || !programs
  const dictionary = await getDictionary(lang);
    if (!dictionary) {
      return null;
    }
  const { page } = dictionary;


  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <div className='text-gray-700 text-xl '>All Programs</div>
      <div className='flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl'>
      <Link href={`/${lang}/home`} className="flex items-center no-underline text-blue-900"> Home </Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
        <p className='m-0'>All Programs</p>
      </div>
      {!isDataEmpty ? (
        <Suspense fallback={<Loading />}>
          <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-600 bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    {page.home.number}
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      {page.programs.program_name}
                      <a href="#">
                        <svg
                          className="w-3 h-3 ml-1.5  text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      {page.programs.status}
                      <a href="#">
                        <svg
                          className="w-3 h-3 ml-1.5 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      {page.programs.actions}
                      <a href="#">
                        <svg
                          className="w-3 h-3 ml-1.5 text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                        </svg>
                      </a>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr
                    key={program.id}
                    className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td scope="row" className="px-6 py-4 ">
                      {program.program_name}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="h-5 min-w-[84px] rounded text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] bg-[#c7ebd1] text-[#075e45]"
                        disabled={true}
                      >
                        {program.program_status}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <Link href="/"
                        className=" top-14 left-11 w-24 h-8 bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center">
                        Apply
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Suspense>
      ) : (
        <div className="mt-16 flex justify-center items-center flex-col gap-2">
          <h2 className="text-black text-xl font-bold">Oops no results</h2>
          <p>Message</p>
        </div>
      )}

    </div>

  )
}
