import { Program,ProgramForm, FilterProps ,ProfileFilter ,ProgramDetails} from '@types';
import { prefixBaseApiPath } from './path';
// import { unstable_noStore as noStore } from 'next/cache';


  // const res = await fetch(`http://localhost:8000/programs?program_id=${program}&page=${currentPage}`);

  
export async function fetchProgramDetails(filters: FilterProps): Promise<ProgramDetails[]> {
  const { program ,currentPage} = filters
  const res = await fetch(prefixBaseApiPath("/programdetails"));
  if (!res.ok) {

    throw new Error('Failed to fetch data')
  }
  
  return res.json()
 
}


export async function fetchPrograms(filters: FilterProps): Promise<Program[]> {
  const { program ,currentPage} = filters
  try {
    const response = await fetch(
      prefixBaseApiPath(`/program`)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return [];
  }
  // noStore();
}
export async function fetchProgramForm(programId: number): Promise<ProgramForm | null> {
  try {
    const response = await fetch(
      prefixBaseApiPath(`/form/${programId}`)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching program data:", error);
    return null;
  }
}

export async function SubmitForm(programId: number): Promise<ProgramForm | null> {
  try {
    const response = await fetch(
      prefixBaseApiPath(`/forms/programid=${programId}/submit`)
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching form data:", error);
    return null;
  }
}
