"use client";
import {useRouter} from "next/navigation";
import {useTranslations, useLocale} from "next-intl";
import {useEffect, useState, Suspense} from "react";
import {Card, Pagination} from "@/components";
import {AuthUtil} from "@/components/auth";
import {ProgramDetails} from "@/types";
import {fetchProgramDetails} from "@/utils";
import Loading from "../loading";
import Link from "next/link";

const ITEMS_PER_PAGE = 7;

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const lang = useLocale();
  AuthUtil({failedRedirectUrl: `/${lang}/login`});

  const showTooltip = (event: React.MouseEvent<HTMLTableCellElement, MouseEvent>, content: string) => {
    const target = event.target as HTMLTableCellElement;

    // Check if content exceeds cell width
    if (target.offsetWidth < target.scrollWidth) {
      const tooltipText = content;

      // Create tooltip element
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = tooltipText || "";

      // Position tooltip above the cursor
      tooltip.style.position = "absolute";
      tooltip.style.top = `${event.clientY - 20}px`;
      tooltip.style.left = `${event.clientX}px`;

      // Append tooltip to body
      document.body.appendChild(tooltip);
    }
  };
  const hideTooltip = () => {
    const tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach((tooltip) => {
      tooltip.remove();
    });
  };

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const [programs, setPrograms] = useState<ProgramDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paginatedPrograms, setPaginatedPrograms] = useState<ProgramDetails[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const currentPage = Number(searchParams?.page) || 1;

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  const t = useTranslations();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allPrograms: ProgramDetails[] = await fetchProgramDetails();
        setPrograms(allPrograms);

        setTotalPages(Math.ceil(allPrograms.length / ITEMS_PER_PAGE));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching program details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedPrograms(programs.slice(start, end));
  }, [currentPage, programs]);

  const sortPrograms = (column: string) => {
    const order = column === sortedColumn && sortOrder === "asc" ? "desc" : "asc";
    const sortedPrograms = [...programs].sort((a, b) => {
      if (column === "program_name") {
        return order === "asc"
          ? a.program_name.localeCompare(b.program_name)
          : b.program_name.localeCompare(a.program_name);
      } else if (column === "enrollment_status") {
        return order === "asc"
          ? a.enrollment_status.localeCompare(b.enrollment_status)
          : b.enrollment_status.localeCompare(a.enrollment_status);
      } else if (column === "total_funds_awaited") {
        return order === "asc"
          ? a.total_funds_awaited - b.total_funds_awaited
          : b.total_funds_awaited - a.total_funds_awaited;
      } else if (column === "total_funds_received") {
        return order === "asc"
          ? a.total_funds_received - b.total_funds_received
          : b.total_funds_received - a.total_funds_received;
      }
      return 0;
    });

    setPrograms(sortedPrograms);
    setSortOrder(order);
    setSortedColumn(column);
  };

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  useEffect(() => {
    // Filter programs based on search query
    const filtered = programs.filter((program) =>
      program.program_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const totalFilteredPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    setTotalPages(totalFilteredPages);

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    // Slice the filtered programs based on pagination
    const paginated = filtered.slice(start, end);

    // Update paginated programs state
    setPaginatedPrograms(paginated);
  }, [currentPage, programs, searchQuery]);

  return (
    <div>
      {isLoading ? (
        <div className="mt- 2 flex justify-center items-center flex-col gap-2"></div>
      ) : (
        <div
          className=" m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center"
          style={{marginTop: "24px", marginBottom: "0px"}}
        >
          <div className="bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
            <div className="flex flex-wrap justify-between items-center" style={{height: "56px"}}>
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
                  marginLeft: "24px",
                }}
              >
                {t("My Programs")}
              </p>
              {/* <div className="flex-1 flex justify-end">
                <SearchBar />
              </div> */}

              <div className="relative" style={{marginTop: "10px", marginRight: "10px"}}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder={t("Search by program name")}
                  className="border border-gray-300 rounded-md px-2 py-1 pl-8" // Added pl-8 to accommodate icon width
                  style={{height: "45px", fontSize: "15px"}}
                />
                <div
                  className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
                  style={{
                    color: "#000", // Icon color
                  }}
                >
                  <svg
                    className="h-4 w-4" // Icon size
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
              </div>
            </div>
            <Suspense fallback={<Loading />}>
              <div className="m-4 md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto  ">
                <table className=" w-full  text-sm text-left text-gray-600 ">
                  <thead className="text-xs text-gray-600 bg-gray-100" style={{height: "56px"}}>
                    <tr>
                      <th scope="col" className="columnTitle px-6 py-3 ">
                        {t("No_")}
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3 ">
                        <div
                          className="flex items-center w-max cursor-pointer"
                          onClick={() => sortPrograms("program_name")}
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
                          onClick={() => sortPrograms("enrollment_status")}
                        >
                          {t("Enrollment Status")}
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
                          onClick={() => sortPrograms("total_funds_awaited")}
                        >
                          {t("Total Funds Awaited")}
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
                          onClick={() => sortPrograms("total_funds_received")}
                        >
                          {t("Total Funds Received")}
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
                    {programs.length > 0 ? (
                      paginatedPrograms.map((program, index) => {
                        const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600"
                            style={{height: "44px"}}
                          >
                            <td className="px-6 py-4 snoElement ">{itemNumber}</td>
                            <td
                              scope="row"
                              className="rowElement px-6 py-4 "
                              style={{
                                maxWidth: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              data-tooltip={program.program_name} // Add data-tooltip attribute
                              onMouseEnter={(e) => showTooltip(e, program.program_name)}
                              onMouseLeave={() => hideTooltip()} // Hide tooltip on mouse leave
                            >
                              {program.program_name}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                type="button"
                                className={`${program.enrollment_status === "enrolled" ? "enrolledButton" : "submittedButton"} buttonElement top-14 text-xs  w-24 h-8 rounded-md text-center tracking-[0px] opacity-100 border-collapse border-[none] left-[811px] ${program.enrollment_status ? "bg-gray-300 text-gray-600" : "bg-[#c7ebd1] text-[#075e45]"}`}
                                disabled={true}
                              >
                                {program.enrollment_status === "enrolled" ? "Enrolled" : "Applied"}
                              </button>
                            </td>
                            <td className="px-6 py-4">{Number(program.total_funds_awaited).toFixed(2)}</td>
                            <td className="px-6 py-4">{Number(program.total_funds_received).toFixed(2)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-10">
                          <div
                            className="flex flex-col items-center justify-center "
                            style={{marginTop: "80px"}}
                          >
                            <h2
                              className="text-black-100 text-xl flex-col gap-2 mb-4
                          style={{ top: '339px', left: '621px', width: '124px', height: '17px', textAlign: 'center', font: 'normal normal 600 14px/17px Inter', letterSpacing: '0px', color: '#494DAF', opacity: 1 }"
                            >
                              {t(
                                "You havent enrolled into any programs yet please tap on the below link to view all programs"
                              )}
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
            {paginatedPrograms.length === 0 && (
              <p className="text-center text-gray-600">{t("No results found")}</p>
            )}
            <div className="p-2 snoElement">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      )}
      <div className="pt-0" style={{marginTop: "0px", marginBottom: "24px"}}>
        <Card />
      </div>
    </div>
  );
}
