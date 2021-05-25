import { Gender, NewPatientEntry } from "../types/PatientEntry";

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };


const handleEntry = ({name,dateOfBirth,ssn,gender,occupation} : Fields): NewPatientEntry => {
    const newPatient : NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseString(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseEnum(gender),
        occupation: parseString(occupation)
    };
    
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


const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseEnum = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect gender');
    }
    return gender;
}

export default handleEntry