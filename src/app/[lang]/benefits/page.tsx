'use client'
import React from 'react';
import Link from 'next/link'
import { fetchBenefitDetails } from '@utils'
import Loading from '../loading';
import { Locale } from '@i18n.config'
import { getDictionary } from '@lib/dictionary'
import { Suspense } from 'react';
import { Card, Pagination, SearchBar } from '../components';
import { AuthUtil } from '../components/auth';
import { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { BenefitDetails } from '@types';
export default async function BenefPage({ searchParams, params: { lang } }
  : {
  searchParams?: {
    query?: string;
    page?: string;
  },
  params: { lang: Locale }
}
) {

  // const [sortKey, setSortKey] = useState<SortKeys>("id");
  // const [sortOrder, setSortOrder] = useState<SortOrder>("ascn");
  // type SortKeys = keyof Program;
  // type SortOrder = "ascn" | "desc";

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

  const router = useRouter();

  const [benefits, setBenefits] = useState<BenefitDetails[]>([]);
  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result: BenefitDetails[] = await fetchBenefitDetails();
        setBenefits(result);

        const dictionary = await getDictionary(lang);
        if (!dictionary) {
          return null;
        }

        const { page } = dictionary;
        setPage(page);
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching benefits details:', error);
      }
    };

    fetchData();
  }, [lang]);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // const handleApplyClick = (benefit: BenefitDetails) => {
  //   router.push(`apply?ern=${benefit.entitlement_reference_number}`);
  // };
  // const handleViewClick = (benefit: BenefitDetails) => {
  //   router.push(`submission?ERN=${benefit.entitlement_reference_number}`);

  // };

  const isDataEmpty = !Array.isArray(benefits) || benefits.length < 1 || !benefits

return (
  <div >
    <AuthUtil failedRedirectUrl='/en/login' />
    {isLoading ? (
      <div className='mt-16 flex justify-center items-center flex-col gap-2'>
        </div>
      ):!isDataEmpty ? (
        <div className=" m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center">
          <div className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
            <div className="flex flex-wrap justify-between items-center">
              <p className="flex items-center text-gray-700 text-x p-2 font-fontcustom m-2 font-bold">{page.benefit.title}</p>
              <SearchBar />
            </div>
              {/* <div className="flex flex-wrap justify-between items-center">
                <p className="flex items-center text-gray-700 text-x p-2 font-fontcustom m-2 ">{page.application.title}</p>
              <SearchBar />
            </div> */}
            <Suspense fallback={<Loading />}>
              <div className="m-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto  ">
                <table className=" w-full  text-sm text-left text-gray-600 ">
                  <thead className="text-xs text-gray-600 bg-gray-100">
                    <tr>
                      <th scope="col" className="columnTitle px-6 py-3 ">
                        {page.benefit.number}
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3 ">
                        <div
                          className="flex items-center w-max"
                      >{page.benefit.program_name}
                          <svg data-column="0" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.enrollment_status}
                          <svg data-column="1" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.entitlement_reference_number}
                          <svg data-column="2" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.funds_awaited}
                          <svg data-column="3" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center w-max">
                          {page.benefit.funds_received}
                          <svg data-column="4" className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {benefits.map((benefit, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600">
                        <td className="snoElement px-6 py-4">{index + 1}</td>
                        <td scope="row" className="rowElement px-6 py-4 ">
                          {benefit.program_name}
                        </td>
                        <td className="px-6 py-4">
                        <button
                              type="button"
                              className={`${benefit.enrollment_status==='enrolled'? 'enrolledButton' : 'draftButton'} buttonElement top-14 text-xs  w-24 h-8 rounded-md text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] ${benefit.enrollment_status ? 'bg-gray-300 text-gray-600' : 'bg-[#c7ebd1] text-[#075e45]'}`}
                            disabled={true}
                            >
                              {benefit.enrollment_status==='enrolled'? 'Enrolled' : 'Draft'}
                            </button>
                        </td>
                        {/* <td className="px-6 py-4">
                          <button
                            type="button"
                            className="h-5 min-w-[84px] rounded text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] bg-[#c7ebd1] text-[#075e45]"
                            disabled={true}
                          >
                            {program.has_applied}
                          </button>
                        </td> */}
                        <td className="text-sm px-6 py-4">
                          {benefit.entitlement_reference_number ? benefit.entitlement_reference_number : 'Entitlement not approved'}
                        </td>
                        {/* <td className="px-6 py-4">
                          <span>{program.is_multiple_form_submission}</span>
                        </td> */}
                        <td className="px-6 py-4">
                          {Number(benefit.funds_received).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          {Number(benefit.funds_awaited).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Suspense>
            <div className='p-2 snoElement'>
            <Pagination />
          </div>
          </div>
        </div>
      ) : (
        <div className='mt-16 flex justify-center items-center flex-col gap-2 '>
          <h2 className='tetx-black text-xl font-bold'>
            Oops no results..
            Sign in Again!
          </h2>
          <p>Message</p>
        </div>
      )}
     (
        <div className='pt-0'>
          <Card params={{ lang }} />
        </div>
      )
  </div>
);
};
