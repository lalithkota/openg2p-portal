
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
    total_funds_awaited: number;
    total_funds_received: number;
}

export interface ApplicationDetails {
    program_name: string;
    application_id: number;
    date_applied: string;
    application_status: string;
}
export interface BenefitDetails {
    program_name: string;
    enrollment_status: string;
    funds_awaited: number;
    funds_received: number;
    entitlement_reference_number: number;
}


export interface ProgramForm {
    program_id:number;
    form_id:number;
    id: number;
    schema: string,
    submission_data:{},
    program_name : string;
    program_description:string;
}

export interface ProgramRegistrantInfo{
    program_registrant_info :{};
}



export interface FilterProps{
    program :string;
    currentPage:number;
}

export interface ApplFilterProps{
    application : string;
    currentPage: number;
}

export interface BenefFilterProps{
    benefit : string;
    currentPage: number;
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
