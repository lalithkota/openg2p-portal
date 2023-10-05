'use client'
import React, { useState } from 'react'
import { SearchProgram } from '.'; 
import { useRouter } from "next/navigation";

const SearchButton = () => (
    <button type='submit' className='-ml-3 z-10 '>
    </button>
);

function SearchBar() {
    const router = useRouter();
    const [program, setProgram] = useState('');
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (program === '') {
            return alert('Please fill in the search bar')
        }
        updateSearchParam(program.toLowerCase());


    }
    const updateSearchParam = (
        program: string
    ) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (program) {
            searchParams.set('program', program)
        } else {
            searchParams.delete('program')
        }
        const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

        router.push(newPathname);
    }
    return (
        <form className="w-100 border border-gray-400 rounded-lg flex items-center justify-between max-sm:flex-col relative max-sm:gap-4 max-w-3xl m-2" onSubmit={handleSearch}>
            <div className="relative w-full">
                <SearchProgram program={program} setProgram={setProgram}/>
            </div>
            <SearchButton  />
        </form>
    )
}

export default SearchBar;