// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry{

}

export interface PatientEntry{
    "id": string;
    "name": string;
    "dateOfBirth": string;
    "ssn"?: string;
    "gender": Gender;
    "occupation": string;
    "entries"? : Entry[];
}

export enum Gender{
    Male = "male",
    Female = "female",
    Other = "other"
}



export type NSPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id' | "entries">;