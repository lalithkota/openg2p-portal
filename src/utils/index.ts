import { Program, Profile, FilterProps, ProfileFilter } from '@types';
import { resolve } from 'path';

export async function fetchPrograms(filters: FilterProps): Promise<Program[]> {
  //await new Promise(resolve=>setTimeout(resolve,3000))


  const { program } = filters
  try {
    const res = await fetch(`http://localhost:8000/programs?program_name=${program}`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()

  } catch (error) {
    console.error("Something bad happened");
    console.error(error);
  }

}

export async function fetchProfile(filters: ProfileFilter): Promise<Profile[]> {
  const { id } = filters
  try {
    const res = await fetch(`http://localhost:8000/profile?id=${id}`)
    if (!res.ok) {

      throw new Error('Failed to fetch data')
    }

    return res.json()

  } catch (error) {
    console.error("Something bad happened");
    console.error(error);
  }

}

