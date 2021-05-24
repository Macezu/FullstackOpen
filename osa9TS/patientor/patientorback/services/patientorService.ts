import diagnoseData from "../data/diagnoses.json";
import patientsData from "../data/patients.json";

import { DiagnoseEntry } from "../types/DiagnoseEntry";
import { PatientEntry } from "../types/PatientEntry";

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;
const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getDiagnoses = () => {
    return diagnoses;
}

const addDiagnose = (diagnose: string) => {
    console.log(`TODO: ${diagnose} added`)
}

const getPatients = () => {
    return patients;
}

export default {
    getDiagnoses,
    getPatients,
    addDiagnose
}