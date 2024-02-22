import React from 'react'
import Link from 'next/link'
import { AuthUtil } from '../components/auth'
import { useEffect } from 'react';
function Others() {



  // useEffect(() => {
  //   const fetchData = async () => {
  //     Formio.createForm(document.getElementById('formio'), {
  //       components: [
  //         {
  //           type: "textfield",
  //           key: "firstName",
  //           label: "First Name",
  //           input: true,
  //         },
  //         {
  //           type: "textfield",
  //           key: "lastName",
  //           label: "Last Name",
  //           input: true,
  //         },
  //         {
  //           type: "textfield",
  //           key: "middleName",
  //           label: "Middle Name",
  //           input: true,
  //         },
  //         {
  //           type: "button",
  //           action: "submit",
  //           key: "submit",
  //           label: "Save Submission",
  //         },
  //         {
  //           type: "button",
  //           action: "saveState",
  //           state: "draft",
  //           key: "saveDraft",
  //           label: "Save as Draft",
  //         },
  //       ],
  //     }
  //     ).then( function (form) {
  //       const customSubmitButton = document.getElementById('custom-submit-button');
  //       console.log('Custom Submit Button:', customSubmitButton);
  //       customSubmitButton?.addEventListener('click', () => {
  // form.on("submit",   (submission: any) =>{
  //   const submissionData = {
  //     id: currentId,
  //     form_data: submission,
  //   };
  //   console.log('submission', submission.state)
  //   console.log('submission', submission)
  //   fetch(`http://localhost:8000/submit/${currentId}`, {
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return fetch(`http://localhost:8000/submit/${currentId}`, {
  //           method: "PUT",
  //           body: JSON.stringify(submissionData),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //       } else {
  //         return fetch("http://localhost:8000/submit", {
  //           method: "POST",
  //           body: JSON.stringify(submissionData),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         });
  //       }
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (submissionData.id) {
  //         console.log("Resource updated:", data);
  //       } else {
  //         console.log("Resource created:", data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error updating/creating resource:", error);
  //     });

  // })

  //   fetch(`http://localhost:8000/submit/${currentId}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((draftData) => {
  //       console.log("Draft data fetched:", draftData);
  //       form.submission = { data: draftData.form_data.data };
  //       console.log('try1', form.submission)
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching draft data:", error);
  //     })
  // });
  //     });
  //   };
  //   fetchData()
  // }, []);

  // useEffect(() => {
  //   const fetchDraftData = async (form: any) => {
  //     try {
  //       const draftResponse = await fetch(`http://localhost:8000/submit/${currentId}`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       const draftData = await draftResponse.json();
  //       console.log("Draft data fetched:", draftData);

  //       // Update form submission with draft data
  //       form.submission = { data: draftData.form_data.data };
  //       console.log('try1', form.submission);
  //     } catch (error) {
  //       console.error("Error fetching draft data:", error);
  //     }
  //   };
  //   const fetchData = async () => {
  //     try {
  //       const form = await Formio.createForm(document.getElementById('formio'), {
  //         components: [
  //           {
  //             type: "textfield",
  //             key: "firstName",
  //             label: "First Name",
  //             input: true,
  //           },
  //           {
  //             type: "textfield",
  //             key: "lastName",
  //             label: "Last Name",
  //             input: true,
  //           },
  //           {
  //             type: "textfield",
  //             key: "middleName",
  //             label: "Middle Name",
  //             input: true,
  //           },
  //           {
  //             type: "button",
  //             action: "submit",
  //             key: "submit",
  //             label: "Save Submission",
  //           },
  //           {
  //             type: "button",
  //             action: "saveState",
  //             state: "draft",
  //             key: "saveDraft",
  //             label: "Save as Draft",
  //           },
  //         ],
  //       });

  //       const customSubmitButton = document.getElementById('custom-submit-button');
  //       customSubmitButton?.addEventListener('click', async () => {
  //         form.submit().then((submission: any) => {
  //           const submissionData = {
  //             id: currentId,
  //             form_data: submission,
  //           };
  //           console.log('submission', submission.state)
  //           console.log('submission', submission)
  //           fetch(`http://localhost:8000/submit/${currentId}`, {
  //             method: "GET",
  //           })
  //             .then((response) => {
  //               if (response.status === 200) {
  //                 return fetch(`http://localhost:8000/submit/${currentId}`, {
  //                   method: "PUT",
  //                   body: JSON.stringify(submissionData),
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                 });
  //               } else {
  //                 return fetch("http://localhost:8000/submit", {
  //                   method: "POST",
  //                   body: JSON.stringify(submissionData),
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                 });
  //               }
  //             })
  //             .then((response) => response.json())
  //             .then((data) => {
  //               if (submissionData.id) {
  //                 console.log("Resource updated:", data);
  //               } else {
  //                 console.log("Resource created:", data);
  //               }
  //             })
  //             .catch((error) => {
  //               console.error("Error updating/creating resource:", error);
  //             });
  //         })
  //       });
  //       await fetchDraftData(form);

  //     } catch (error) {
  //       console.error("Error creating form:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="rounded-lg border-gray-200 p-4 mx-4 lg:px-4 m-0 mt-2">
      <AuthUtil failedRedirectUrl='/en/login'></AuthUtil>
      <div className='mx-auto max-w-screen-xl'>
        <div className='text-gray-700 text-xl '>Others</div>
        <div className='flex flex-wrap gap-2 mt-6 items-center mx-auto max-w-screen-xl'>
          <Link href="/programs" className="flex items-center text-blue-900"> Home </Link>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
          <p className='m-0'>Others</p>
          <div>
              <div>
              <div id="formio" className='m-4'>
              </div>
              <button id="custom-submit-button" className=" bg-red-700" >Submitttttttttt</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Others
