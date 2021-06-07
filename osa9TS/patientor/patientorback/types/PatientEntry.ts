import { DiagnoseEntry } from "./DiagnoseEntry";

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}



export interface BaseEntry {
    id: string;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry["code"]>
}

export interface PatientEntry {
    "id": string;
    "name": string;
    "dateOfBirth"?: string;
    "ssn"?: string;
    "gender": Gender;
    "occupation": string;
    "entries": Array<Entry>;
};

interface SickLeave {
    startDate: string;
    endDate: string;
};

interface Discharge {
    date: string;
    criteria: string;
};

interface HealthCheckEntry extends BaseEntry {
    type: EntryType;
    healthCheckRating: HealthCheckRating;
};

interface OccupationalHealthcareEntry extends BaseEntry {
    type: EntryType;
    employerName: string;
    sickLeave?: SickLeave;
};

interface HospitalEntry extends BaseEntry {
    type: EntryType
    discharge: Discharge;
};

export enum EntryType {
    HealthCheckEntry = "HealthCheck",
    OccupationalHealthcareEntry = "OccupationalHealthcare",
    HospitalEntry = "Hospital"
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type NSPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

