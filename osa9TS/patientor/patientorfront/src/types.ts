export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

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

export enum EntryType {
    HealthCheckEntry = "HealthCheck",
    OccupationalHealthcareEntry = "OccupationalHealthcare",
    HospitalEntry = "Hospital"
}


export interface BaseEntry {
    "id": string;
    "date": string;
    "description": string;
    "specialist": string;
    "diagnosisCodes"?: Array<Diagnosis["code"]>
}

export interface Patient {
    "id": string;
    "name": string;
    "dateOfBirth"?: string;
    "ssn"?: string;
    "gender": Gender;
    "occupation": string;
    "entries": Array<Entry>;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
    | HospitalEntry
    | OccupationalHealthcareEntry
    | HealthCheckEntry
;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type HealthEntrynId = Omit<HealthCheckEntry,'id' | 'type'>;

export type FullPatientEntry = Patient;

export type NSPatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

