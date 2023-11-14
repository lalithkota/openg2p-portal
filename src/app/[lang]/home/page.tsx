// 'use client'
import React from 'react'
import { MouseEventHandler, useState } from "react";
import { Card, Pagination } from '../components';
import { fetchPrograms } from '@/utils'
import { SearchBar } from '../components';
import { Suspense } from 'react'
import Loading from '../loading';
import { getDictionary } from '@/lib/dictionary'
import { Locale, i18n } from '@/i18n.config'
import { Program } from '@types';


export default async function Page({ searchParams, params: { lang } }: {
  searchParams?: {
    query?: string;
    page?: string;
  },
  params: { lang: Locale }
}) {

  // const [sortKey, setSortKey] = useState<SortKeys>("id");
  // const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  // type SortKeys = keyof Program;
  // type SortOrder = "ascn" | "desc";
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const programs = await fetchPrograms({
    program: query || "",
    currentPage: currentPage,
  });
  // function sortData({
  //   tableData,
  //   sortKey,
  //   reverse,
  // }: {
  //   tableData: Program[];
  //   sortKey: SortKeys;
  //   reverse: boolean;
  // }) {
  //   if (!sortKey) return tableData;

  //   const sortedData = programs.sort((a, b) => {
  //     return a[sortKey] > b[sortKey] ? 1 : -1;
  //   });

  //   if (reverse) {
  //     return sortedData.reverse();
  //   }

  //   return sortedData;
  // }
  // const sortedData = () => sortData({ tableData: programs, sortKey, reverse: sortOrder === "desc" });


  const isDataEmpty = !Array.isArray(programs) || programs.length < 1 || !programs
  const dictionary = await getDictionary(lang);
  if (!dictionary) {
    return null;
  }
  const { page } = dictionary;
  // function SortButton({
  //   sortOrder,
  //   columnKey,
  //   sortKey,
  //   onClick,
  // }: {
  //   sortOrder: SortOrder;
  //   columnKey: SortKeys;
  //   sortKey: SortKeys;
  //   onClick: MouseEventHandler<HTMLButtonElement>;
  // }) {
  //   return (
  //     <button
  //       onClick={onClick}
  //       className={`${sortKey === columnKey && sortOrder === "desc"
  //         ? "w-3 h-3 ml-1.5  text-gray-400 sort-reverse"
  //         : "w-3 h-3 ml-1.5  text-gray-400"
  //         }`}
  //     >
  //       ▲
  //     </button>
  //   );
  // }

  // const headers: { key: SortKeys; label: string }[] = [
  //   { key: "id", label: "ID" },
  //   { key: "program_name", label: "Program Name" },
  //   { key: "application_id", label: "Application Id" },
  //   { key: "program_status", label: "Program Status" },
  //   { key: "application_status", label: " Application Status" },
  //   { key: "submitted_on", label: "Submiited On" },
  //   { key: "entitlement", label: "Entitlement (in USD)" },
  //   { key: "amount_received", label: "Amount Receieved" },
  // ];

  // function changeSort(key: SortKeys) {
  //   setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");

  //   setSortKey(key);
  // }
  return (
    <div >
      {!isDataEmpty ? (
        <div className=" m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center">
          <div className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
            <div className="flex flex-wrap justify-between items-center">
              <p className="flex items-center text-gray-700 text-x p-2 font-fontcustom m-2 ">{page.home.title}</p>
              <SearchBar />
            </div>
            <Suspense fallback={<Loading />}>
              <div className="m-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto  ">
                <table className=" w-full  text-sm text-left text-gray-600 ">
                  <thead className="text-xs text-gray-600 bg-gray-100">
                    <tr>
                      {/* {headers.map((row) => {
                        return (
                          <th scope="col" className="px-6 py-3" key={row.key}>
                            <div className="flex items-center">
                              {row.label}{" "}
                              <SortButton
                                columnKey={row.key}
                                onClick={() => changeSort(row.key)}
                                {...{
                                  sortOrder,
                                  sortKey,
                                }}
                              />
                            </div>
                          </th>
                        );
                      })} */}
                      <th scope="col" className="px-6 py-3 ">
                        {page.home.number}
                      </th>
                      <th scope="col" className="px-6 py-3 ">
                        <div
                          className="flex items-center w-max"
                        >{page.home.program_name}
                          <svg data-column="0" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.home.application_id}
                          <svg data-column="1" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.home.program_status}
                          <svg data-column="2" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.home.application_status}
                          <svg data-column="3" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.home.submiited_on}
                          <svg data-column="4" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.home.entitlement}
                          <svg data-column="5" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.home.amount_receieved}
                          <svg data-column="6" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {programs.map((program, index) => (
                      <tr key={program.id} className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600">
                        <td className="px-6 py-4">{index + 1}</td>
                        <td scope="row" className="px-6 py-4 ">
                          {program.program_name}
                        </td>
                        <td className="px-6 py-4">
                          {program.application_id}
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
                          <button
                            type="button"
                            className="h-5 min-w-[84px] rounded text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] bg-[#c7ebd1] text-[#075e45]"
                            disabled={true}
                          >
                            {program.application_status}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {program.submitted_on}
                        </td>
                        <td className="px-6 py-4">
                          <span>{program.entitlement}</span>
                        </td>
                        <td className="px-6 py-4">
                          {program.amount_received}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Suspense>
            {/* <div className='p-2'>
              <Pagination />
            </div> */}
          </div>
        </div>
      ) : (
        <div className='mt-16 flex justify-center items-center flex-col gap-2 '>
          <h2 className='tetx-black text-xl font-bold'>
            Oops no results
          </h2>
          <p>Message</p>
        </div>
      )}

      <div className='pt-0'>
        <Card params={{ lang }} />
      </div>
    </div>
  );
};



