import diagnoseData from "../data/diagnoses.json";
import patientsData from "../data/patients";
import { generateId } from "../utilities/idGenerator"
import { DiagnoseEntry } from "../types/DiagnoseEntry";
import { NSPatientEntry,  NewPatientEntry, PatientEntry} from "../types/PatientEntry";

const diagnoses: Array<DiagnoseEntry> = diagnoseData as Array<DiagnoseEntry>;

let patientsSFW: NSPatientEntry[] = patientsData as NSPatientEntry[];

let patients: PatientEntry[] = patientsData as PatientEntry[];

const getDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
}

const getDiagnoseWithCode = (code: string): DiagnoseEntry | undefined => {
    return diagnoses.find(x => x.code === code)
}

const addDiagnose = (diagnose: string) => {
    console.log(`TODO: ${diagnose} added`)
}

const getPatients = (): PatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth,ssn, gender, occupation }) => ({
        id, name, dateOfBirth,ssn, gender, occupation
    }));
};



const getPatientWithId = (_id: string) : PatientEntry | undefined => {
    const patient = patients.find(x => x.id = _id);
    if (patient !== undefined){
        patient.entries = []
    }
    console.log(patient)
    return patient
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