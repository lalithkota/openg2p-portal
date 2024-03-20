"use client";
import React from "react";
import {Combobox, Transition} from "@headlessui/react";
import {SearchProgramsProps} from "../types";
import {useState, Fragment} from "react";
import {programs} from "../constants";

const SearchProgram = ({program, setProgram}: SearchProgramsProps) => {
  const [query, setQuery] = useState("");

  const filteredPrograms =
    query === ""
      ? programs
      : programs.filter((item) =>
          item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className=" relative w-full flex justify-end">
      <div className="w-1/2">
      <Combobox value={program} onChange={setProgram}>
        <div className="relative  mt-1 ">
          <div className=" w-full">
            <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Combobox.Button className="absolute">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </Combobox.Button>
            </div>
            <Combobox.Input
              className="ml-7 p-2 text-sm text-black-600  rounded-lg bg-white-200 focus:ring-gray-100 focus:border-transparent dark:bg-white-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black-800 dark:focus:ring-gray-500 dark:focus:border-transaparent outline-none"
              placeholder="Search Programs"
              displayValue={(program: string) => program}
              onChange={(e) => setQuery(e.target.value)}
            ></Combobox.Input>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute mt- max-h-60 w-full overflow-auto rounded-md bg-white-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filteredPrograms.length === 0 && query !== "" ? (
                <Combobox.Option value={query} className=" cursor-default select-none py-2 pl-10 pr-4">
                  Create &quot;{query}&quot;
                </Combobox.Option>
              ) : (
                filteredPrograms.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({active}) =>
                      ` hover:bg-white opacity-90 z-10 relative cursor-default bg-blue-100 select-none py-2 pl-10 pr-4 ${
                        active ? "bg-primary-blue text-black" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({selected, active}) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      </div>
    </div>
  );
};

export default SearchProgram;
