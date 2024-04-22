"use client";
import {useRouter} from "next/navigation";
import {useTranslations, useLocale} from "next-intl";
import {useState, useEffect, Suspense} from "react";
import {Pagination, SearchBar} from "@/components";
import {AuthUtil} from "@/components/auth";
import {BenefitDetails} from "@/types";
import {fetchBenefitDetails} from "@/utils";
import Loading from "../loading";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

export default function BenefPage({
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

  const [benefits, setBenefits] = useState<BenefitDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paginatedBenefits, setPaginatedBenefits] = useState<BenefitDetails[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const currentPage = Number(searchParams?.page) || 1;
  const t = useTranslations();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const allBenefits: BenefitDetails[] = await fetchBenefitDetails();
        setBenefits(allBenefits);

        setTotalPages(Math.ceil(allBenefits.length / ITEMS_PER_PAGE));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching benefits details:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setPaginatedBenefits(benefits.slice(start, end));
  }, [currentPage, benefits]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const sortBenefits = (column: string) => {
    const order = column === sortedColumn && sortOrder === "asc" ? "desc" : "asc";
    const sortedBenefits = [...benefits].sort((a, b) => {
      if (column === "program_name") {
        return order === "asc"
          ? a.program_name.localeCompare(b.program_name)
          : b.program_name.localeCompare(a.program_name);
      } else if (column === "entitlement_reference_number") {
        return order === "asc"
          ? a.entitlement_reference_number - b.entitlement_reference_number
          : b.entitlement_reference_number - a.entitlement_reference_number;
      } else if (column === "funds_awaited") {
        return order === "asc" ? a.funds_awaited - b.funds_awaited : b.funds_awaited - a.funds_awaited;
      } else if (column === "funds_received") {
        return order === "asc" ? a.funds_received - b.funds_received : b.funds_received - a.funds_received;
      } else if (column === "date_approved") {
        const dateA = new Date(a.date_approved).getDate();
        const dateB = new Date(b.date_approved).getDate();
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

    setBenefits(sortedBenefits);
    setSortOrder(order);
    setSortedColumn(column);
  };

  return (
    <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0">
      <div
        className="mx-auto max-w-screen-xl"
        style={{marginTop: "10px", marginBottom: "5px", height: "10px"}}
      >
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
              marginLeft: "48px",
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
            {t("My Benefits")}
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className="mt-16 flex justify-center items-center flex-col gap-2"></div>
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
                {t("My Benefits")}
              </p>
              <div className="flex-1 flex justify-end">
                <SearchBar />
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
                          onClick={() => sortBenefits("program_name")}
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
                          onClick={() => sortBenefits("entitlement_reference_number")}
                        >
                          {t("Entitlement Reference Number")}
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
                          onClick={() => sortBenefits("funds_awaited")}
                        >
                          {t("Funds Awaited")}
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
                          onClick={() => sortBenefits("funds_received")}
                        >
                          {t("Funds Received")}
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
                      <th scope="col" className="columnTitle px-6 py-3">
                        <div
                          className="flex items-center w-max cursor-pointer"
                          onClick={() => sortBenefits("date_approved")}
                        >
                          {t("Date Approved")}
                          <svg
                            data-column="4"
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
                    {benefits.length > 0 ? (
                      paginatedBenefits.map((benefit, index) => {
                        const itemNumber = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-white-200 dark:border-white-200 text-gray-600"
                            style={{height: "44px"}}
                          >
                            <td className="snoElement px-6 py-4">{itemNumber}</td>
                            <td
                              scope="row"
                              className="rowElement px-6 py-4 "
                              style={{
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                              data-tooltip={benefit.program_name} // Add data-tooltip attribute
                              onMouseEnter={(e) => showTooltip(e, benefit.program_name)}
                              onMouseLeave={() => hideTooltip()} // Hide tooltip on mouse leave
                            >
                              {benefit.program_name}
                            </td>
                            <td className="text-sm px-6 py-4">
                              {benefit.entitlement_reference_number
                                ? benefit.entitlement_reference_number
                                : "Entitlement not approved"}
                            </td>
                            <td className="px-6 py-4">{Number(benefit.funds_awaited).toFixed(2)}</td>
                            <td className="px-6 py-4">{Number(benefit.funds_received).toFixed(2)}</td>
                            <td scope="row" className="px-6 py-4 ">
                              {new Date(benefit.date_approved).toLocaleDateString()}

                              {/* {benefit.date_approved} */}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-10">
                          <div
                            className="flex flex-col items-center justify-center"
                            style={{marginTop: "80px"}}
                          >
                            <h2
                              className="text-black-100 text-xl flex-col gap-2 mb-4
                          style={{ top: '339px', left: '621px', width: '124px', height: '17px', textAlign: 'center', font: 'normal normal 600 14px/17px Inter', letterSpacing: '0px', color: '#494DAF', opacity: 1 }"
                            >
                              {t("No benefits yet, please tap on the below link to view all programs")}
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
