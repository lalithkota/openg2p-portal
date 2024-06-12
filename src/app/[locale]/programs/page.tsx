"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState, Suspense} from "react";
import {Pagination} from "@/components";
import {AuthUtil} from "@/components/auth";
import {ApplicationDetails, Program} from "@/types";
import {fetchApplicationDetails, fetchPrograms} from "@/utils";
import Loading from "../loading";

const ITEMS_PER_PAGE = 7;

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

  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<ApplicationDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paginatedPrograms, setPaginatedPrograms] = useState<Program[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const currentPage = Number(searchParams?.page) || 1;

  const t = useTranslations();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      router.push(`/${lang}/programs?query=${searchQuery}`);
    }
  }, [searchQuery, lang, router]);

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

  const sortPrograms = (column: string) => {
    const order = column === sortedColumn && sortOrder === "asc" ? "desc" : "asc";
    const sortedPrograms = [...programs].sort((a, b) => {
      if (column === "name") {
        return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (column === "program_status") {
        return order === "asc" ? a.state.localeCompare(b.state) : b.state.localeCompare(a.state);
      } else if (column === "actions") {
        // Get the button labels for comparison
        const buttonLabelA = getActionButtonLabel(a);
        const buttonLabelB = getActionButtonLabel(b);

        // Compare button labels alphabetically
        return order === "asc"
          ? buttonLabelA.localeCompare(buttonLabelB)
          : buttonLabelB.localeCompare(buttonLabelA);
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
      program.name.toLowerCase().includes(searchQuery.toLowerCase())
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
    router.push(`reapply?programid=${program.id}`);
  };

  const canReapply = (programName: string) => {
    return applications.some((app) => app.program_name === programName);
    //  && app.application_status !== 'completed');
  };

  const getActionButtonLabel = (program: Program) => {
    const showReapplyButton = canReapply(program.name);
    if (program.has_applied) {
      switch (program.state) {
        case "Applied":
          return program.is_multiple_form_submission && showReapplyButton ? t("Reapply") : t("View");

        case "draft":
        case "enrolled":
          return program.is_multiple_form_submission
            ? showReapplyButton
              ? t("Reapply")
              : t("View")
            : t("View");

        case "not_eligible":
        case "Not Applied":
        default:
          return showReapplyButton ? t("View") : " "; // Return a space for empty states
      }
    } else {
      return program.is_portal_form_mapped ? t("Apply") : " "; // Space for no button
    }
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
                    ) : (
                      showReapplyButton && (
                        <button
                          className="viewButton buttonElement w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                          onClick={() => handleViewClick(program)}
                        >
                          {t("View")}
                        </button>
                      )
                    )
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
                      showReapplyButton && (
                        <button
                          className="viewButton buttonElement w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                          onClick={() => handleViewClick(program)}
                        >
                          {t("View")}
                        </button>
                      )
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
                    ) : (
                      showReapplyButton && (
                        <button
                          className="viewButton w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                          onClick={() => handleViewClick(program)}
                        >
                          {t("View")}
                        </button>
                      )
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
        case "not_eligible":
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
        case "Not Applied":
          return (
            <>
              {showReapplyButton ? (
                <td>
                  <button
                    className="viewButton w-24 h-8 bg-blue-700 rounded-md text-blue text-xs font-normal flex items-center justify-center"
                    onClick={() => handleViewClick(program)}
                  >
                    {t("View")}
                  </button>
                </td>
              ) : null}
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
      <div
        className="mx-auto max-w-screen-xl"
        style={{marginTop: "10px", marginBottom: "5px", height: "10px"}}
      >
        {/* <div
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
            marginLeft:"40px"
          }}
        >
          {t("All Programs")}
        </div> */}
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
              font: "normal normal 600 16px/17px Inter",
              letterSpacing: "0px",
              color: "#494DAF",
              opacity: "1",
              marginLeft: "40px",
              marginRight: "8px",
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
              font: "normal normal 600 16px/17px Inter",
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
            <div className="flex flex-wrap justify-between items-center" style={{height: "42px"}}>
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
                {t("All Programs")}
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
              <div
                className="  md:space-x-8 mx-auto max-w-screen-xl flex justify-center items-center relative overflow-x-auto"
                style={{marginTop: "24px", marginBottom: "0px"}}
              >
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-600 bg-gray-100" style={{height: "56px"}}>
                    <tr>
                      <th scope="col" className="columnTitle px-6 py-3 text-sm font-normal">
                        {t("No_")}
                      </th>
                      <th scope="col" className="columnTitle px-6 py-3 text-sm font-normal">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => sortPrograms("name")}
                        >
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
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => sortPrograms("program_status")}
                        >
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
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => sortPrograms("actions")}
                        >
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
                          style={{height: "44px"}}
                        >
                          <td className="snoElement px-6 py-4">{itemNumber}</td>
                          <td
                            scope="row"
                            className="rowElement px-6 py-4"
                            style={{
                              maxWidth: "100px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            data-tooltip={program.name} // Add data-tooltip attribute
                            onMouseEnter={(e) => showTooltip(e, program.name)}
                            onMouseLeave={() => hideTooltip()} // Hide tooltip on mouse leave
                          >
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
                                  : program.state === "draft" && canReapply(program.name)
                                    ? "submittedButton"
                                    : program.state === "draft" && !canReapply(program.name)
                                      ? "notAppliedButton"
                                      : program.state === "applied"
                                        ? "appliedButton"
                                        : program.state === "not_eligible" // Added condition here
                                          ? "noteligibleButton"
                                          : ""
                            }
                          `}
                              disabled={true}
                            >
                              {
                                program.state === "draft" && canReapply(program.name)
                                  ? "Applied"
                                  : program.state === "draft" && !canReapply(program.name)
                                    ? "Not Applied"
                                    : program.state === "not_eligible" // Check if state is "not_eligible"
                                      ? "Not Eligible" // Display "Not Eligible" if true
                                      : program.state === "enrolled"
                                        ? "Enrolled"
                                        : program.state // Otherwise, display the program state
                              }
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
            {paginatedPrograms.length === 0 && programs.length > 0 && (
              <p className="text-center text-gray-600" style={{marginTop: "15px", marginBottom: "20px"}}>
                {t("No results found")}
              </p>
            )}
            {paginatedPrograms.length > 0 && (
              <div className="p-2 snoElement">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-16 flex justify-center items-center flex-col gap-2">
          <h2 className="text-black text-xl font-bold">Oops no results.. Sign in Again!</h2>
          {/* <p>{t("Message")}</p> */}
        </div>
      )}
      {/* <div className="pt-0" style={{marginTop: "0px", marginBottom: "24px"}}>
        <Card />
      </div> */}
    </div>
  );
}
