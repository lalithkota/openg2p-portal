export interface SearchProgramsProps{
    program:string;
    setProgram :(program :string) => void;
}


export interface Program {
    id: number;
    program_name: string;
    application_id: number;
    program_status: string;
    application_status: string;
    submitted_on: string;
    entitlement: number;
    amount_received: number;
}
export interface ProgramForm {
    id: number;
    specific_program_name : string;
    form_json_schema : Record<string, any>;
}
export interface FilterProps{
    program :string;
}
export interface HomeProps {
    program: string;
    searchParams: FilterProps;
  }
  
export interface ProfileFilter{
    id:number;
}

export interface Profile{
    id:number;
    given_name: string;
    family_name: string; 
    addl_name: string;
    date_of_birth: string;
    email: string;
    gender: string;
    address: string;
    ids:string;
    notification_preferance:string;
    bank_ids:string;
    phone_numbers:string;
}


export interface FormFilterProps{
    id :number;
}
