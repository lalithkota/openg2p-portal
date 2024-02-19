import ProgramList from "@app/[lang]/forms/page";

export interface SearchProgramsProps{
    program:string;
    setProgram :(program :string) => void;
}
export interface Program {
    id: number;
    name: string;
    description: number;
    state: string;
    has_applied: string;
    is_portal_form_mapped: string;
    is_multiple_form_submission: number;
    last_application_status: number;
}
export interface ProgramDetails {
    program_name: string;
    enrollment_status: string;
    total_funds_awaited: 0;
    total_funds_received: 0;
}



export interface ProgramForm {
    program_id:number;
    id: number;
    schema: {
    components: Record<string, any>[];
  };
    submission_data:{},
    program_name : string;
    program_description:string;
}


export interface FilterProps{
    program :string;
    currentPage:number; 
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
