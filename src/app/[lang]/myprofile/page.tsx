'use client'


import React, { useEffect } from 'react'
import Link from 'next/link'
import { Formio, Templates } from "@tsed/react-formio";
import tailwind from "@tsed/tailwind-formio";
import { useState, MouseEvent } from "react";
import { Locale } from '@/i18n.config'
import { authContext } from "../components/auth";
import { AuthUtil } from '../components/auth'
import { getDictionary } from '@/lib/dictionary'
import { fetchProfile } from '@utils';
import { Profile } from '@types';

export default async function Profile({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  Formio.use(tailwind);
  Templates.framework = "tailwind";



  const [profile, setProfile] = useState<Profile | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Failed to fetch profile", error);
        // Handle the error (e.g., show error message)
      }
    };
    loadProfile();
  }, []);



  const dictionary = await getDictionary(lang);
  if (!dictionary) {
    return null;
  }
  const { page } = dictionary
//   return (
//     <div className=" rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
//       <AuthUtil failedRedirectUrl="/en/login" />
//       <div className='mx-auto max-w-screen-xl'>
//         <div className='text-gray-700 text-xl '>Profile</div>
//         <div className='flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl'>
//           <Link href="/programs" className="flex items-center text-blue-900"> Home </Link>
//           <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
//           <p className='m-0'>My Profile </p>
//         </div>
//       </div>
//       <div className="m-6 p-6 md:space-x-4 mx-auto max-w-screen-xl flex justify-center items-center bg-brand container w-1180 shadow-md  pb-0 rounded-lg top-24">
//         <div className="grid grid-rows-3 grid-flow-col gap-10 m-0">
//           <div>Name</div>
//           {authContext.profile ? authContext.profile.name : ""}
//           <div>Last Name</div>
//           {authContext.profile ? authContext.profile.middle_name : ""}
//           <div>Gender:</div>
//           {authContext.profile ? authContext.profile.gender : ""}
//           <div>Birthdate:</div>
//           {authContext.profile ? authContext.profile.birthdate : ""}
//           <div>Email:</div>
//           {authContext.profile ? authContext.profile.email : ""}
//           <div>Phone:</div>
//           {authContext.profile ? authContext.profile.phone_number : ""}
//         </div>
//       </div>
//     </div>
//   )
// }
return (
  <div className="rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
    <AuthUtil failedRedirectUrl="/en/login" />
    <div className='mx-auto max-w-screen-xl'>
    <div className=''style={{ textAlign: 'left', font: 'normal normal 600 16px/20px Inter', letterSpacing: '0px', color: '#484848', opacity: '1', top: '118px', left: '139px', width: '135px', height: '26px' }}>
        My Profile</div>
      <div className='flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl'>
        <Link href={`/${lang}/programs`} className="flex items-center text-blue-900"
        style={{ top: '154px', left: '139px', width: '40px', height: '17px', textAlign: 'left', font: 'normal normal 600 14px/17px Inter', letterSpacing: '0px', color: '#494DAF', opacity: '1', whiteSpace: 'nowrap' }}
                 > Home </Link>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
        <p className='m-0'
         style={{ top: '154px', left: '317px', width: '115px', height: '17px', textAlign: 'left', font: 'normal normal 600 14px/17px Inter', letterSpacing: '0px', color: '#848484', opacity: '1', whiteSpace: 'nowrap' }}
                >My Profile </p>
      </div>
    </div>
    {profile ? (
      <div className="bg-brand container w-full mx-auto shadow-md pb-0 rounded-lg my-4 p-6 ">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="font-semibold">Personal Information</div>
          <div></div> {/* Empty cell for grid alignment */}
          
          <div>Given Name:</div>
          <div>{profile.given_name}</div>

          <div>Last Name:</div>
          <div>{profile.family_name}</div>

          <div>Additional Name:</div>
          <div>{profile.addl_name}</div>
          
          <div className="font-semibold">Contact Information</div>
          <div></div> {/* Empty cell for grid alignment */}
          
          <div>Email:</div>
          <div>{profile.email}</div>

          <div>Phone:</div>
          <div>{profile.phone_numbers.map(phone => phone.phone_no).join(', ')}</div>
          
          <div className="font-semibold">Demographic Details</div>
          <div></div> {/* Empty cell for grid alignment */}
          
          <div>Gender:</div>
          <div>{profile.gender}</div>

          <div>Birthdate:</div>
          <div>{profile.birthdate}</div>
        </div>
      </div>
    ) : (
      <div>Loading profile...</div>
    )}
  </div>
);


    }