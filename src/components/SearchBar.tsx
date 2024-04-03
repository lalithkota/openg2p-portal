"use client";
import {useSearchParams, usePathname, useRouter} from "next/navigation";
import {useState, FormEvent} from "react";
import {SearchProgram} from ".";

const SearchButton = () => <button type="submit" className="-ml-3 z-10 "></button>;

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const [program, setProgram] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (program === "") {
      return alert("Please fill in the search bar");
    }
    updateSearchParam(program.toLowerCase());
  };
  const updateSearchParam = (program: string) => {
    const params = new URLSearchParams(searchParams);
    if (program) {
      params.set("query", program);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <form
      // className=" flex flex-row w-full sm:w-1/4 lg:w-1/4 border border-gray-400 rounded-lg  max-sm:gap-1  m-2"
      className="flex flex-row items-center border border-gray-400 rounded-lg gap-1 m-2"
      onSubmit={handleSearch}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0.75rem center", // Adjust as necessary for icon position
        backgroundSize: "1rem", // Adjust as necessary for icon size
        paddingLeft: "2rem",
      }}
    >
      <div className="relative ">
        <SearchProgram program={program} setProgram={setProgram} />
      </div>
      <SearchButton />
    </form>
  );
}
