import { Gender, NewPatientEntry } from "../types/PatientEntry";

const handleEntry = (object: unknown): NewPatientEntry => {
    const newPatient = ({
        "name": parseName(object.name),
        "dateOfBirth": object.dateOfBirth,
        "ssn": object.ssn,
        "gender": object.gender,
        "occupation": object.occupation
    })
    console.log('Saving a patient, no pun intended!');
    return newPatient
}


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseEnum = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing name');
    }
    return gender;
}

export default handleEntry