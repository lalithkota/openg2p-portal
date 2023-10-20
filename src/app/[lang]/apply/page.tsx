'use client'
import dynamic from 'next/dynamic';

import { useSearchParams } from 'next/navigation';
import { getProgramData } from '@utils';
import { Form } from '@formio/react';
import { Fragment } from 'react';
export default async function Apply() {
    
    const searchParams = useSearchParams()
    const formId = searchParams.get('formId')
    const form = await getProgramData(formId)
    const submithandler = async (event: any) => {
        try {
            const submissionData = {
                form_data: event.data  // Assuming event.data contains the form data
            };
    
            const response = await fetch('http://localhost:8000/submissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            // Handle the response here if needed
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div>
            <Fragment>
                <div className='p-4 min-h-screen flex flex-col items-center justify-center'>
                    <h1>{form[0].specific_program_name}</h1>
                    <Form
                        form={
                            form[0].form_json_schema
                        }
                        submission={{}}
                        options={{}}
                        onSubmit={submithandler}
                    />
                </div>
            </Fragment>
        </div>
    );
};


