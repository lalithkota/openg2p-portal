import { Program,ProgramForm, FilterProps, ApplFilterProps, BenefFilterProps, ProfileFilter, ProgramDetails, ApplicationDetails, BenefitDetails, ProgramRegistrantInfo,} from '@types';
import { prefixBaseApiPath } from './path';
// import { unstable_noStore as noStore } from 'next/cache';


  // const res = await fetch(`http://localhost:8000/programs?program_id=${program}&page=${currentPage}`);

export async function fetchProgramDetails(): Promise<ProgramDetails[]> {

  const res = await fetch(prefixBaseApiPath(`/programdetails`));
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: ProgramDetails[] = await res.json();
  return data;
}

// export async function fetchProgramDetails(page = 1, itemsPerPage = 10) {
//   const res = await fetch(`${prefixBaseApiPath(`/programdetails`)}?page=${page}&limit=${itemsPerPage}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   const data = await res.json();
//   return {
//     programs: data.items, // Assuming 'items' contains the list of programs
//     total: data.total   // Assuming 'total' is provided by your API
//   };
// }

export async function fetchApplicationDetails(): Promise<ApplicationDetails[]> {

  const res = await fetch(prefixBaseApiPath("/applicationdetails"));
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data: ApplicationDetails[] = await res.json();
  return data;
}

export async function fetchBenefitDetails(): Promise<BenefitDetails[]> {

  const res = await fetch(prefixBaseApiPath("/benefitdetails"));
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: BenefitDetails[] = await res.json();
  return data;
}

// export async function fetchBenefitDetails(page: number = 1, pageSize: number = 10): Promise<BenefitDetails[]> {
//   const res = await fetch(prefixBaseApiPath(`/benefitdetails?page=${page}&pageSize=${pageSize}`));
//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   const data: BenefitDetails[] = await res.json();
//   return data;
// }

export async function fetchPrograms(): Promise<Program[]> {

  const res = await fetch(prefixBaseApiPath("/program"));
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data: Program[] = await res.json();
  return data;
}

export async function fetchProgramForm(programId: number): Promise<ProgramForm> {
  const res = await fetch(prefixBaseApiPath(`/form/${programId}`));
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data: ProgramForm = await res.json();
  return data;

}
export async function PutProgramForm(programId: number, submissionData: any): Promise<ProgramRegistrantInfo> {
  const url = prefixBaseApiPath(`/form/${programId}`);
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionData),
  });

  if (!res.ok) {
    throw new Error('Failed to update resource');
  }

  const data: ProgramRegistrantInfo = await res.json();
  return data;
}

export async function SubmitForm(programId: number, submissionData: any): Promise<ProgramRegistrantInfo> {
  const url = prefixBaseApiPath(`/form/${programId}/submit`);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionData),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    console.error('Error response:', errorResponse);
    throw new Error('Failed to submit data');
  }

  const data: ProgramRegistrantInfo = await res.json();
  return data;
}

export function useClient() {
    throw new Error('Function not implemented.');
}
