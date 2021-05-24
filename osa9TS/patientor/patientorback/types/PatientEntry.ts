export interface PatientEntry{
    "id": string;
    "name": string;
    "dateOfBirth": string;
    "ssn": string;
    "gender": string;
    "occupation": string;
}

export type NSPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;