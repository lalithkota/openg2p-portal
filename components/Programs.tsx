import React from 'react';

export interface Program {
  id: number;
  program_name: string;
  application_id: number;
  program_status: string;
  application_status: string;
  submitted_on: string;
  entitlement: number;
  amount_received: number;
}
interface ProgramsProps {
  programs: Program[] | null;
}
const Programs: React.FC<ProgramsProps> = ({ programs }) => {
  if (!programs || programs.length === 0) {
    return <div className="text-center "> No programs available please add more programs</div>;
  }
  return (
    <div>
      <div className="container w-1180 shadow-md mb-8 pb-10 rounded-lg top-24">
        <div className="flex justify-between">
          <p className="h-5 text-left tracking-tight text-[#484848] opacity-100 ml-6 mt-6 font-normal text-base leading-5">My Applications</p>
          <form className="my-2 my-lg-0" action="/selfservice/home">
            <div className="w-50 h-10 border opacity-100 flex items-center mr-10 pl-10 rounded-md border-gray-300 bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13.6"
                height="13.6"
                fill="currentColor"
                className="bi bi-search search-icon"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                ></path>
              </svg>
              <input
                placeholder="Search by program name"
                className="search-text"
                name="q"
                id="search-input"
              />
              <span id="search-clear">
                <i className="fa fa-times"></i>
              </span>
            </div>
          </form>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400 dark:text-gray-900">
            <thead className="text-xs text-gray-900 dark:text-white uppercase bg-gray-900 dark:bg-white-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Program Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Application ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Program Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Application Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Submitted On
                </th>
                <th scope="col" className="px-6 py-3">
                  Entitlement (in USD)
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount Received (in USD)
                </th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={program.id} className="bg-white border-b dark:bg-white-200 dark:border-white-200  hover:bg-gray-50 dark:hover:bg-gray-300">
                  <td className="px-6 py-4">{index + 1}</td>
                  <th scope="row" className="px-6 py-4 font-medium text-white-400 whitespace-nowrap dark:text-black">
                    {program.program_name}
                  </th>
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
      </div>
    </div>

  );
};


export default Programs;
