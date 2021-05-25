import diagnoseData from "../data/diagnoses.json";
import patientsData from "../data/patients";
import { generateId } from "../utilities/idGenerator"
import { DiagnoseEntry } from "../types/DiagnoseEntry";
import { NSPatientEntry,  NewPatientEntry } from "../types/PatientEntry";

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

let patientsSFW: NSPatientEntry[] = patientsData as NSPatientEntry[];

const getDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
}

const getDiagnoseWithCode = (code: string): DiagnoseEntry | undefined => {
    return diagnoses.find(x => x.code === code)
}

const addDiagnose = (diagnose: string) => {
    console.log(`TODO: ${diagnose} added`)
}

const getPatients = (): NSPatientEntry[] => {
    return patientsSFW.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const getPatientWithId = (_id: string) : NSPatientEntry | undefined => {
    return patientsSFW.find(x => x.id = _id);
}

const addPatient = ( patient : NewPatientEntry) : NSPatientEntry | undefined => {
    const id  = generateId();
    const newPatient = {
        id,
        ...patient
    }
    newPatient.id = id;

    patientsSFW.push(newPatient);
    return newPatient;
}

export default {
    getDiagnoses,
    addDiagnose,
    getDiagnoseWithCode,
    getPatients,
    getPatientWithId,
    addPatient
}