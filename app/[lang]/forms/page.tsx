'use client'
import React, { useState, useEffect } from 'react';
import { ProgramForm } from '@types';
import { fetchProgramForms } from '@utils';
 import { useRouter } from 'next/navigation';

export default async function ProgramList() {
   const router = useRouter();

  const forms = await fetchProgramForms();

  const handleApplyClick = (form: ProgramForm) => {
     router.push(`apply?formId=${form.id}`);
  };

  return (
    <div className='bg-brown-400 text-center'>
      <h1>Program List</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            {form.specific_program_name}
            <button className="p-4 " onClick={() => handleApplyClick(form)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
