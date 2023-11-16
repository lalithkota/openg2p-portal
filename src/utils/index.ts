import { Program,Profile, FilterProps ,ProfileFilter ,ProgramForm} from '@types';
// import { unstable_noStore as noStore } from 'next/cache';



export async function fetchPrograms(filters: FilterProps): Promise<Program[]> {
  //await new Promise(resolve=>setTimeout(resolve,3000))
  const { program ,currentPage} = filters
  const res = await fetch(`http://localhost:8000/programs?program_name=${program}&page=${currentPage}`);
  if (!res.ok) {

    throw new Error('Failed to fetch data')
  }

  return res.json()
  // noStore();
}


export async function  getProgramData  (formId: string | null) {
  
  try {
    const response = await fetch(`http://localhost:8000/forms?id=${formId}`); // Replace with your API endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching program data:', error);
    return null;
  }
  // noStore();
};
export async function fetchProgramForms(): Promise<ProgramForm[]> {
  const res = await fetch('http://localhost:8000/forms');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
  // noStore();
}

export async function fetchProfile(filters: ProfileFilter): Promise<Profile[]> {
  const { id } = filters
  const res = await fetch(`http://localhost:8000/profile?id=${id}`)
  if (!res.ok) {

    throw new Error('Failed to fetch data')
  }

  return res.json()
  // noStore();
}
