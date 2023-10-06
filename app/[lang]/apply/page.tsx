'use client'

import { useSearchParams } from 'next/navigation';
import { getProgramData } from '@utils';
import { ProgramForm } from '@types';
import { Form } from '@formio/react';
import { Fragment } from 'react';
export default async function Apply() {

    const searchParams = useSearchParams()
    const formId = searchParams.get('formId')


    const form = await getProgramData(formId)
    console.log(form[0].form_json_schema)
    return (
        <div>
            
            <Fragment>
                <div className='p-4 min-h-screen flex flex-col items-center justify-center'>
                <h1>{form[0].specific_program_name}</h1>
                    <Form
                        form={
                            form[0].form_json_schema
                        }
                    />
                </div>
            </Fragment>
        </div>

    );
};


