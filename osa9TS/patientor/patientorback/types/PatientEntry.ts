export interface PatientEntry{
    "id": string;
    "name": string;
    "dateOfBirth": string;
    "ssn": string;
    "gender": Gender;
    "occupation": string;
}

export enum Gender{
    Male = "male",
    Female = "female",
    Unknown = "unknown"
}

export type NSPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;