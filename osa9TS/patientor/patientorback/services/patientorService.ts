import diagnoseData from "../data/diagnoses.json";
import patientsData from "../data/patients.json";

import { DiagnoseEntry } from "../types/DiagnoseEntry";
import { NSPatientEntry } from "../types/PatientEntry";

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;
const patients: NSPatientEntry[] = patientsData as NSPatientEntry[];

const getDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
}

const addDiagnose = (diagnose: string) => {
    console.log(`TODO: ${diagnose} added`)
}

const getPatients = (): NSPatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

export default {
    getDiagnoses,
    getPatients,
    addDiagnose
}