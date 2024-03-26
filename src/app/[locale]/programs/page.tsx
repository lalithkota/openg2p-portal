"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState, Suspense} from "react";
import {Card, Pagination, SearchBar} from "@/components";
import {AuthUtil} from "@/components/auth";
import {ApplicationDetails, Program} from "@/types";
import {fetchApplicationDetails, fetchPrograms} from "@/utils";
import Loading from "../loading";

const ITEMS_PER_PAGE = 6;

export default function ProgrmPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const lang = useLocale();
  AuthUtil({failedRedirectUrl: `/${lang}/login`});

  const router = useRouter();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paginatedPrograms, setPaginatedPrograms] = useState<Program[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const currentPage = Number(searchParams?.page) || 1;

  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allPrograms: Program[] = await fetchPrograms();
        setPrograms(allPrograms);

        setTotalPages(Math.ceil(allPrograms.length / ITEMS_PER_PAGE));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchData();

    const fetchAppDetails = async () => {
      try {
        setIsLoading(true);
        const appDetails = await fetchApplicationDetails();
        setApplications(appDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching application details:", error);
      }
    };

    fetchAppDetails();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedPrograms(programs.slice(start, end));
  }, [currentPage, programs]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  // const query = searchParams?.query || '';
  // const currentPage = Number(searchParams?.page) || 1;

  const isDataEmpty = !Array.isArray(programs) || programs.length < 1 || !programs;

  const handleApplyClick = (program: Program) => {
    router.push(`apply?programid=${program.id}`);
  };
  // const handleViewClick = (program: Program) => {
  //   router.push(`view?programId=${program.id}`);
  // };
  const handleViewClick = (program: Program) => {
    router.push(`view?programid=${program.id}`);
  };
  const handleReapplyClick = (program: Program) => {
    router.push(`apply?programid=${program.id}`);
  };

  const canReapply = (programName: string) => {
    return applications.some((app) => app.program_name === programName);
    //  && app.application_status !== 'completed');
  };

  const renderActionButton = (program: Program) => {
    const showReapplyButton = canReapply(program.name);
    if (program.has_applied) {
      switch (program.state) {
        case "Applied":
          return (
            <>
              <td>
                {program.is_portal_form_mapped &&
                  (program.is_multiple_form_submission ? (
                    showReapplyButton ? (
                      <button
                        className="applyButton buttonElement w-24 h-8 bg-blue-700 rounded-md text-white text-xs font-normal flex items-center justify-center"
                        onClick={() => handleReapplyClick(program)}
                      >
                        {t("Reapply")}
                      </button>
                    ) : null
                  ) : (
                    <button
                      className="viewButton buttonElement w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                      onClick={() => handleViewClick(program)}
                    >
                      {t("View")}
                    </button>
                  ))}
              </td>
            </>
          );
        case "draft":
          return (
            <>
              <td>
                {program.is_portal_form_mapped &&
                  (program.is_multiple_form_submission ? (
                    showReapplyButton ? (
                      <button
                        className="applyButton w-24 h-8 bg-blue-700 rounded-md text-white text-xs font-normal flex items-center justify-center"
                        onClick={() => handleReapplyClick(program)}
                      >
                        {t("Reapply")}
                      </button>
                    ) : (
                      <button
                        className="applyButton w-24 h-8 bg-blue-700 rounded-md text-white text-xs font-normal flex items-center justify-center"
                        onClick={() => handleApplyClick(program)}
                      >
                        {t("Apply")}
                      </button>
                    )
                  ) : (
                    <button
                      className="viewButton w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                      onClick={() => handleViewClick(program)}
                    >
                      {t("View")}
                    </button>
                  ))}
              </td>
            </>
          );
        case "enrolled":
          return (
            <>
              <td>
                {program.is_portal_form_mapped &&
                  (program.is_multiple_form_submission ? (
                    showReapplyButton ? (
                      <button
                        className="applyButton w-24 h-8 bg-blue-700 rounded-md text-white text-xs font-normal flex items-center justify-center"
                        onClick={() => handleReapplyClick(program)}
                      >
                        {t("Reapply")}
                      </button>
                    ) : null
                  ) : (
                    <button
                      className="viewButton w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                      onClick={() => handleViewClick(program)}
                    >
                      {t("View")}
                    </button>
                  ))}
              </td>
            </>
          );
        case "Not Eligible":
          return (
            <>
              <td>
                <button
                  className="viewButton w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                  onClick={() => handleViewClick(program)}
                >
                  {t("View")}
                </button>
              </td>
            </>
          );
        default:
          return null;
      }
    } else {
      return (
        <>
          <td>
            {program.is_portal_form_mapped && (
              <button
                className="applyButton w-24 h-8 bg-blue-700 rounded-md text-white text-xs font-normal flex items-center justify-center"
                onClick={() => handleApplyClick(program)}
              >
                {t("Apply")}
              </button>
            )}
          </td>
        </>
      );
    }
  };

  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0">
      <div className="mx-auto max-w-screen-xl">
        <div
          className=" shift-right"
          style={{
            textAlign: "left",
            font: "normal normal 600 16px/20px Inter",
            letterSpacing: "0px",
            color: "#484848",
            opacity: "1",
            top: "118px",
            left: "139px",
            width: "135px",
            height: "26px",
          }}
        >
          {t("All Programs")}
        </div>
        <div className="flex flex-wrap gap-2 mt-1 items-center ">
          <Link
            href={`/${lang}/home`}
            className="shift-right"
            style={{
              top: "154px",
              left: "139px",
              width: "40px",
              height: "17px",
              textAlign: "left",
              font: "normal normal 600 14px/17px Inter",
              letterSpacing: "0px",
              color: "#494DAF",
              opacity: "1",
            }}
          >
            {" " + t("Home") + " "}
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="0.8em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          <p
            className=""
            style={{
              top: "154px",
              left: "197px",
              width: "86px",
              height: "17px",
              textAlign: "left",
              font: "normal normal 600 14px/17px Inter",
              letterSpacing: "0px",
              color: "#848484",
              opacity: "1",
              whiteSpace: "nowrap",
            }}
          >
            {t("All Programs")}
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-0 flex justify-center items-center flex-col gap-2"></div>
      ) : !isDataEmpty ? (
        <div className=" m-6 p-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center">
          <div className=" bg-brand container w-1180 shadow-md rounded-lg top-24">
            <div className="flex flex-wrap justify-between items-center">
              <p
                className="font-fontcustom m-4 "
                style={{
                  top: "226px",
                  left: "159px",
                  width: "98px",
                  height: "20px",
                  textAlign: "left",
                  font: "normal normal 600 16px/20px Inter",
                  letterSpacing: "0px",
                  color: "#484848",
                  opacity: "1",
                  whiteSpace: "nowrap",
                }}
              >
                {t("All Programs")}
              </p>
              <SearchBar />
            </div>
            <Suspense fallback={<Loading />}>
              <div className="  md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-600 bg-gray-100">
                    <tr>
                      <th scope="col" className="columnTitle px-6 py-3 text-sm font-normal">
                        {t("No_")}
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3 text-sm font-normal">
                        <div className="flex items-center">
                          {t("Program Name")}
                          <Link href="#">
                            <svg
                              className="w-3 h-3 ml-1.5  text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </Link>
                        </div>
                      </th>

                      <th scope="col" className="columnTitle px-6 py-3">
                        <div className="flex items-center">
                          {t("Program Status")}
                          <Link href="#">
                            <svg
                              className="w-3 h-3 ml-1.5 text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </Link>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div className="flex items-center">
                          {t("Actions")}
                          <Link href="#">
                            <svg
                              className="w-3 h-3 ml-1.5 text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </Link>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPrograms.map((program, index) => {
                      const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                      return (
                        <tr
                          key={program.id}
                          className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600"
                        >
                          <td className="snoElement px-6 py-4">{itemNumber}</td>
                          <td scope="row" className="rowElement px-6 py-4 ">
                            {program.name}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              className={`
                            top-14 text-xs w-24 h-8 rounded-md text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px]
                            ${
                              program.state === "enrolled"
                                ? "enrolledButton"
                                : program.state === "Not Applied"
                                  ? "notAppliedButton"
                                  : program.state === "draft"
                                    ? "submittedButton"
                                    : program.state === "applied"
                                      ? "appliedButton"
                                      : ""
                            }
                          `}
                              disabled={true}
                            >
                              {program.state}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">{renderActionButton(program)}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Suspense>
            <div className="p-2 snoElement">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-16 flex justify-center items-center flex-col gap-2">
          <h2 className="text-black text-xl font-bold">Oops no results.. Sign in Again!</h2>
          <p>{t("Message")}</p>
        </div>
      )}
      <div className="pt-0">
        <Card />
      </div>
    </div>
  );
}
