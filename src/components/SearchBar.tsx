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
      className=" flex flex-row w-full sm:w-1/2 lg:w-1/4 border border-gray-400 rounded-lg  max-sm:gap-4  m-2"
      onSubmit={handleSearch}
    >
      <div className="relative ">
        <SearchProgram program={program} setProgram={setProgram} />
      </div>
      <SearchButton />
    </form>
  );
}
