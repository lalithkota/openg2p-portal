"use client";
import {ProgramForm} from "@/types";
import {Locale} from "@/i18n.config";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
// import { ProgramForm, Locale } from '@types';
import {fetchProgramForm} from "@/utils";
import Loading from "../loading";

export default function ProgramList({params: {lang}}: {params: {lang: Locale}}) {
  const [programForms, setProgramForms] = useState<ProgramForm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const programIds = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const fetchedForms = await Promise.all(programIds.map((id) => fetchProgramForm(id)));
        setProgramForms(fetchedForms.filter((form) => form !== null) as ProgramForm[]);
      } catch (err) {
        setError("Failed to fetch program forms");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForms();
  }, []);

  const handleApplyClick = (programId: number) => {
    router.push(`/${lang}/apply/${programId}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Program List</h2>
      <ul>
        {programForms.map((form) => (
          <li key={form.program_id}>
            <div>{form.program_name}</div>
            <button onClick={() => handleApplyClick(form.program_id)}>Apply</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
