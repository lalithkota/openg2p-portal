"use client";
import {useRouter} from "next/navigation";
import {useTranslations, useLocale} from "next-intl";
import {Suspense, useEffect, useState} from "react";
import {Pagination, SearchBar} from "@/components";
import {AuthUtil} from "@/components/auth";
import {ApplicationDetails} from "@/types";
import {fetchApplicationDetails} from "@/utils";
import Loading from "../loading";
import Link from "next/link";

const ITEMS_PER_PAGE = 30;

export default function ApplcnPage({
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
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paginatedApplications, setPaginatedApplications] = useState<ApplicationDetails[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const currentPage = Number(searchParams?.page) || 1;
  const t = useTranslations();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allApplications: ApplicationDetails[] = await fetchApplicationDetails();
        setApplications(allApplications);

        setTotalPages(Math.ceil(allApplications.length / ITEMS_PER_PAGE));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applications details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedApplications(applications.slice(start, end));
  }, [currentPage, applications]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  function getTransformedStatus(status: string) {
    if (status === "active" || status === "inprogress") {
      return "Applied";
    }
    return toTitleCase(status);
  }
  const sortApplications = (column: string) => {
    const order = column === sortedColumn && sortOrder === "asc" ? "desc" : "asc";
    const sortedApplications = [...applications].sort((a, b) => {
      if (column === "program_name") {
        return order === "asc"
          ? a.program_name.localeCompare(b.program_name)
          : b.program_name.localeCompare(a.program_name);
      } else if (column === "application_status") {
        return order === "asc"
          ? getTransformedStatus(a.application_status).localeCompare(
              getTransformedStatus(b.application_status)
            )
          : getTransformedStatus(b.application_status).localeCompare(
              getTransformedStatus(a.application_status)
            );
      } else if (column === "application_id") {
        return order === "asc" ? a.application_id - b.application_id : b.application_id - a.application_id;
      } else if (column === "date_applied") {
        const dateA = new Date(a.date_applied).getTime();
        const dateB = new Date(b.date_applied).getTime();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    setApplications(sortedApplications);
    setSortOrder(order);
    setSortedColumn(column);
  };

  function getStatusClass(status: string) {
    switch (status) {
      case "completed":
        return "completedButton";
      case "active":
      case "inprogress":
        return "appliedButton";
      case "rejected":
        return "rejectedButton";
      default:
        return "";
    }
  }

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  return (
    <div>
      {isLoading ? (
        <div className="mt-16 flex justify-center items-center flex-col gap-2"></div>
      ) : (
        <div className=" m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center">
          <div className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
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
                {t("My Application")}
              </p>
              <SearchBar />
            </div>
            <Suspense fallback={<Loading />}>
              <div className="m-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto  ">
                <table className=" w-full  text-sm text-left text-gray-600 ">
                  <thead className="text-xs text-gray-600 bg-gray-100">
                    <tr>
                      <th scope="col" className="columnTitle px-6 py-3 ">
                        {t("No_")}
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3 ">
                        <div
                          className="flex items-center w-max cursor-pointer"
                          onClick={() => sortApplications("program_name")}
                        >
                          {t("Program Name")}
                          <svg
                            data-column="0"
                            className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div
                          className="flex items-center w-max cursor-pointer"
                          onClick={() => sortApplications("application_status")}
                        >
                          {t("Application Status")}
                          <svg
                            data-column="1"
                            className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div
                          className="flex items-center w-max cursor-pointer"
                          onClick={() => sortApplications("application_id")}
                        >
                          {t("Application ID")}
                          <svg
                            data-column="2"
                            className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div
                          className="flex items-center w-max cursor-pointer"
                          onClick={() => sortApplications("date_applied")}
                        >
                          {t("Date Applied")}
                          <svg
                            data-column="3"
                            className="w-3 h-3 ml-1.5  text-gray-600  sortable-icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                          </svg>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.length > 0 ? (
                      paginatedApplications.map((application, index) => {
                        const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600"
                          >
                            <td className="px-6 py-4 snoElement">{itemNumber}</td>
                            <td scope="row" className="rowElement px-6 py-4 ">
                              {application.program_name}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                type="button"
                                className={`top-14 text-xs  w-24 h-8 rounded-md text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] text-white ${getStatusClass(application.application_status)}`}
                                disabled={true}
                              >
                                {application.application_status === "active" ||
                                application.application_status === "inprogress"
                                  ? "Applied"
                                  : toTitleCase(application.application_status)}
                              </button>
                            </td>
                            <td className="px-6 py-4">{application.application_id}</td>
                            <td className="px-6 py-4">
                              {new Date(application.date_applied).toLocaleString()}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10">
                          <div className="flex flex-col items-center justify-center">
                            <h2
                              className="text-black-100 text-xl flex-col gap-2 mb-4
                          style={{ top: '339px', left: '621px', width: '124px', height: '17px', textAlign: 'center', font: 'normal normal 600 14px/17px Inter', letterSpacing: '0px', color: '#494DAF', opacity: 1 }"
                            >
                              {t("No applications yet, please tap on the below link to view all programs")}
                            </h2>
                            <Link href={`/${lang}/programs`}>
                              <p
                                className="text-blue-500 hover:underline mb-20"
                                style={{
                                  top: "339px",
                                  left: "621px",
                                  width: "124px",
                                  height: "17px",
                                  textAlign: "center",
                                  font: "normal normal 600 14px/17px Inter",
                                  letterSpacing: "0px",
                                  color: "#494DAF",
                                  opacity: 1,
                                }}
                              >
                                {t("View All Program")}
                              </p>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Suspense>
            <div className="p-2 snoElement">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
