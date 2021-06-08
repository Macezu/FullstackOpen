import diagnoseData from "../data/diagnoses.json";
import patientsData from "../data/patients";
import { generateId } from "../utilities/idGenerator"
import { DiagnoseEntry } from "../types/DiagnoseEntry";
import { NSPatientEntry,  NewPatientEntry, PatientEntry, EntryWithoutId} from "../types/PatientEntry";

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
    return patients.map(({ id, name, dateOfBirth,ssn, gender, occupation, entries }) => ({
        id, name, dateOfBirth,ssn, gender, occupation, entries
    }));
};



const getPatientWithId = (_id: string) : PatientEntry | undefined => {
    const patient = patients.find(x => x.id = _id);
    console.log(patient)
    return patient
}

const addPatient = ( patient : NewPatientEntry) : NSPatientEntry | undefined => {
    const id  = generateId();
    const newPatient = {
        id,
        ...patient
    }
    
    patientsSFW.push(newPatient);
    return newPatient;
}

const updatePatient = ( entry : EntryWithoutId , pId : string) : NSPatientEntry | undefined => {
    const id = generateId();
    const newEntry = {
        id,
        ...entry
    }
    const targetPatient = patients.find(x => x.id === pId)
    if (targetPatient){
        targetPatient.entries.concat(newEntry)
        patients = patients.map( x => x.id !== targetPatient.id ? x : targetPatient)
    }
    return targetPatient
   

}

export default {
    getDiagnoses,
    addDiagnose,
    getDiagnoseWithCode,
    getPatients,
    getPatientWithId,
    addPatient,
    updatePatient
}