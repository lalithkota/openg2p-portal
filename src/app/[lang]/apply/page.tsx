'use client'
import { useSearchParams } from 'next/navigation';
import { getProgramData } from '@utils';
import Link from 'next/link';
import { Formio, Templates } from "@tsed/react-formio";
import tailwind from "@tsed/tailwind-formio";
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { ProgramForm } from '@types';
import Modal from '../components/Modal';


export default function Apply() {
    let currentId = 74

    const router = useRouter();
    Formio.use(tailwind);
    Templates.framework = "tailwind";
    const searchParams = useSearchParams()
    const formId = searchParams.get('formId')
    const [forms, setForm] = useState<ProgramForm[]>([]);


    useEffect(() => {

        const fetchDraftData = async (form:any) => {
            try {
              const draftResponse = await fetch(`http://localhost:8000/submit/${currentId}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              });
        
              const draftData = await draftResponse.json();
              console.log("Draft data fetched:", draftData);
        
              // Update form submission with draft data
              form.submission = { data: draftData.form_data.data };
              console.log('try1', form.submission);
            } catch (error) {
              console.error("Error fetching draft data:", error);
            }
          };
        const fetchData = async () => {
            var formData = await getProgramData(formId);
            Formio.createForm(document.getElementById('formio'), 
            formData[0].form_json_schema
            ).then( function (form)  {
                const customSubmitButton = document.getElementById('custom-submit-button');
                console.log('Custom Submit Button:', customSubmitButton);
                customSubmitButton?.addEventListener('click', () => {
                    form.submit().then((submission:any)  =>{
                        const submissionData = {
                          id: currentId, 
                          form_data: submission,
                        };
                          console.log('submission', submission.state)
                          console.log('submission', submission)
                          //router.push(`submission?formId=${currentId}`);
                          fetch(`http://localhost:8000/submit/${currentId}`, {
                            method: "GET",
                          })
                            .then((response) => {
                              if (response.status === 200) {
                                return fetch(`http://localhost:8000/submit/${currentId}`, {
                                  method: "PUT",
                                  body: JSON.stringify(submissionData),
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                });
                              } else {
                                return fetch("http://localhost:8000/submit", {
                                  method: "POST",
                                  body: JSON.stringify(submissionData),
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                });
                              }
                            })
                            .then((response) => response.json())
                            .then((data) => {
                              if (submissionData.id) {
                                console.log("Resource updated:", data);
                              } else {
                                console.log("Resource created:", data);
                              }
                            })
                            .catch((error) => {
                              console.error("Error updating/creating resource:", error);
                            });

                        })
                    
                });
                 fetchDraftData(form);

              });
            setForm(formData);
            //localStorage.setItem('formState', 'true');       
        };
        fetchData();
    },[currentId] );

    // useEffect(() => {
    //     const fetchDraftData = async (form:any) => {
    //         try {
    //           const draftResponse = await fetch(`http://localhost:8000/submit/${currentId}`, {
    //             method: "GET",
    //             headers: {
    //               "Content-Type": "application/json",
    //             },
    //           });
        
    //           const draftData = await draftResponse.json();
    //           console.log("Draft data fetched:", draftData);
        
    //           // Update form submission with draft data
    //           form.submission = { data: draftData.form_data.data };
    //           console.log('try1', form.submission);
    //         } catch (error) {
    //           console.error("Error fetching draft data:", error);
    //         }
    //       };
    //     const fetchData = async () => {
    //         try {
    //             var formData = await getProgramData(formId);
    //             const form = await Formio.createForm(document.getElementById('formio'),formData[0].form_json_schema);
    //             const customSubmitButton = document.getElementById('custom-submit-button');
    //             customSubmitButton?.addEventListener('click', async () => {
    //               form.submit().then((submission:any)  =>{
    //                 const submissionData = {
    //                   id: currentId,
    //                   form_data: submission,
    //                 };
    //                 console.log('submission', submission.state)
    //                 console.log('submission', submission)
    //                 fetch(`http://localhost:8000/submit/${currentId}`, {
    //                   method: "GET",
    //                 })
    //                   .then((response) => {
    //                     if (response.status === 200) {
    //                       return fetch(`http://localhost:8000/submit/${currentId}`, {
    //                         method: "PUT",
    //                         body: JSON.stringify(submissionData),
    //                         headers: {
    //                           "Content-Type": "application/json",
    //                         },
    //                       });
    //                     } else {
    //                       return fetch("http://localhost:8000/submit", {
    //                         method: "POST",
    //                         body: JSON.stringify(submissionData),
    //                         headers: {
    //                           "Content-Type": "application/json",
    //                         },
    //                       });
    //                     }
    //                   })
    //                   .then((response) => response.json())
    //                   .then((data) => {
    //                     if (submissionData.id) {
    //                       console.log("Resource updated:", data);
    //                     } else {
    //                       console.log("Resource created:", data);
    //                     }
    //                   })
    //                   .catch((error) => {
    //                     console.error("Error updating/creating resource:", error);
    //                   });
    //               })
    //             });
    //             await fetchDraftData(form);
    //             setForm(formData)
    //           } catch (error) {
    //             console.error("Error creating form:", error);
    //           }
              
    //         };
            
          
    //         fetchData();
    //       }, []);

          
    if (forms.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className=' rounded-lg border-gray-200 m-6 p-4 '>
            <div className='text-gray-700 text-xl '>Application Form</div>
            <div className='flex flex-wrap gap-2 mt-4 items-center mx-auto max-w-screen-xl'>
                <Link href="/" className="flex items-center  text-blue-900"> Home </Link>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                <Link href="/programs" className="flex items-center  text-blue-900"> All Programs </Link>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
                <p className='m-0'>Application Form</p>
            </div>
            <div className="flex flex-row gap-10 justify-center mt-4 align-top ">
                <div className="flex-col flex-wrap justify-between items-center border border-gray-300 bg-brand container pb-10 rounded-lg top-24 shadow-md ">
                    <p className=" text-gray-700 pt-4 pl-4 pb-0 font-fontcustom  ">Application form</p>
                    <h1 className='font-fontcustom text-gray-700 pl-4 pb-4'>{forms[0].specific_program_name}</h1>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div id="formio" className='m-4'>
                    </div>
                </div>
                <div className="basis-1/2 mb-80 flex-col flex-wrap justify-between items-center border border-gray-300 bg-brand container pb-10 rounded-lg top-24 shadow-md ">
                    <p className=" text-gray-700 pt-4 pl-4 pb-0 font-fontcustom  ">{forms[0].specific_program_name}</p>
                    <h1 className='font-fontcustom text-gray-700 pl-4 pb-4'>About the programsss</h1>
                    <hr className="border-t mx-0 border-gray-400 " />
                    <div className='flex flex-col  gap-2 items-center m-4'>
                        <button id="custom-submit-button" className=" w-full p-6 h-8 bg-blue-700 rounded-md text-white text-sm font-normal flex items-center justify-center" >Submit</button>
                        <Modal params={{
                            lang: 'en'
                        }} />
                    </div>
                </div>
            </div>
        </div>

    );
};

