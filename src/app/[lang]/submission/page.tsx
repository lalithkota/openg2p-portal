
'use client'
import { Locale } from '@i18n.config';
import { getDictionary } from '@lib/dictionary';
import { ApplicationDetails } from '@types';
import {fetchApplicationDetails,fetchPrograms} from '@utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default async function Submission({ params: { lang } }: {
    searchParams?: {
      query?: string;
      page?: string;
    },
    params: { lang: Locale }
  }){
    const [currentDate, setCurrentDate] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(true);
    const [page, setPage] = useState<any>(null);
    // const [applications, setApplications] = useState<ApplicationDetails[]>([]);
    const [applicationId, setApplicationId] = useState('');
    const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);
    const searchParams = useSearchParams()
    const programId = searchParams.get('programId');
    const formId = searchParams.get('formId')
    useEffect(() => {
      const fetchData = async () => {
        try {
            // const result: ApplicationDetails[] = await fetchApplicationDetails();
            // setApplications(result);
            const programs = await fetchPrograms();
            const applications= await fetchApplicationDetails();
            const program = programs.find(prog => prog.id === Number(programId));     // Find the program by ID
            const application = applications.find(app => app.program_name=== program?.name);    // Find the application that corresponds to the program name
            // if (application) {
            //   setApplicationId(application.application_id.toString());
            // }
            if (application) {
                setApplicationDetails(application);
              }
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString();
            setCurrentDate(formattedDate);
            const dictionary = await getDictionary(lang);
            if (!dictionary) {
                return null;
            }

            const { page } = dictionary;
            setPage(page);
        } catch (error) {
            console.error('Error fetching applications details:', error);
          }
      };
      fetchData();
    }, [programId]);
    const handlePrint = () => {
        window.print();
    };
    const hideToastSuccessMsg = () => {
        setIsToastVisible(false);
    };
    // const isDataEmpty = !Array.isArray(applicationId) || applicationId.length < 1 || !applicationId
    return (
        <div className=' rounded-lg border-gray-200 m-6 p-4 '>
            <div className='print:hidden'>
                <div className='text-gray-700 text-xl '>Program Submission</div>
                <div className='flex flex-wrap gap-2 mt-4 items-center mx-auto max-w-screen-xl'>
                    <Link href={`/en/home`}  className="flex items-center  text-blue-900"> Home </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                    <Link href={`/en/programs`}  className="flex items-center  text-blue-900"> All Programs </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                    <p className='m-0'>Program Submission</p>
                </div>
            </div>
            {applicationDetails && (
                <div>
            <div className={`fixed top-110 right-5 md:right-5 w-full md:w-1/4 z-50 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-sm leading-5 ${isToastVisible ? 'block' : 'hidden'}`}>
                <div className="relative">
                    Thank you. Your application has been submitted successfully.
                    Please note your application ID for future reference - {applicationDetails.application_id}
                </div>
                <button className="absolute top-3 right-3 md:right-3 md:top-3 outline-none bg-transparent border-none text-white cursor-pointer p-0" onClick={hideToastSuccessMsg}>
                    <img src="/img/close_icon@2x.png" alt="close" width={10} height={10} />
                </button>
            </div>

            <div className="flex flex-row gap-6 justify-center mt-4 ">
                <div className=" border border-gray-300 bg-brand container rounded-lg shadow-md">
                    <div className="flex-col  flex-wrap justify-between items-center">
                        <div className='m-5 '>
                            <p className='text-gray-900 mb-4'>Dear User,</p>
                            <div className='text-gray-700 mb-4'>
                                Thank you for submitting your form for the {applicationDetails.program_name}.
                                Your application number is {applicationDetails.application_id}
                            </div>
                            <div className='text-gray-700 mb-4'>
                                We appreciate your interest in and we are committed to providing you with the support you need to achieve your goals. Our team will now review your application and assess your eligibility for the scheme. This process may take some time, and we appreciate your patience while we work to provide you with the best possible service.
                            </div>
                            <div className='text-gray-700 mb-4'>
                                Please note that if additional information is required to process your application, we will contact you using the email or phone number provided in your application. Therefore, it is important that you check your email and phone regularly to avoid any delays. Once your application has been reviewed, we will notify you of the outcome via email or phone. If your application is approved, we will provide you with the necessary instructions to access the benefits of the scheme.
                            </div>

                            <div className='text-gray-700 mb-4'>
                                Thank you once again for your application, and we wish you the best of luck in your future endeavors.
                            </div>
                            <div className='text-gray-700 mb-4'>
                                Best regards,
                                <p>Program Management Team</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-1/2 print:hidden mb-80 flex-col flex-wrap justify-between items-center border border-gray-300 bg-brand container pb-10 rounded-lg top-24 shadow-md ">
                    <p className=" text-gray-700 pt-4 pl-4 pb-0  ">{applicationDetails.program_name}</p>
                    <button className=' ml-4 mb-4 w-24 h-8 bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center '>Applied</button>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div className='pt-4 text-sm text-gray-700 pl-4 pb-0 '>
                        <h3 >Application ID</h3>
                        <h1 className='text-black font-bold mb-4'>{applicationDetails.application_id}</h1>
                        <h3>Submitted On</h3>
                        <h1 className='text-black font-bold mb-4'>{applicationDetails.date_applied}</h1>
                    </div>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div className='flex flex-col  gap-2 items-center m-4'>
                        <Link href={`/en/home`}  className=" w-full p-6 h-8 bg-white border border-blue-700 rounded-md text-blue-700 text-sm font-normal flex items-center justify-center" >View all programs</Link>
                        <button className=" w-full p-6 h-8  bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center" onClick={handlePrint} >print</button>
                    </div>
                </div>
            </div>
            </div>
            )}
        </div>
    );
};
