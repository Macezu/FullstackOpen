import { NewEntryEntry } from "../types/PatientEntry"
import { DiagnoseEntry } from "../types/DiagnoseEntry"

type Fields = { date: unknown, description: unknown, specialist: unknown, diagnosisCodes: unknown, type: unknown, healthCheckRating : unknown, employerName : unknown, sickLeave : unknown, discharge : unknown  };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isArray = (arr : unknown): arr is Array<string> =>{
    return arr instanceof Array
}

const isNumber = (num : unknown): num is number => {
    return typeof num === "number" || num instanceof Number
}

const isStringArray = (value : unknown) :string[] => {
    if (!value ||!isArray(value) || isString(value[0])){
        throw new Error('Incorrect or missing codes');
    }
    return value;
}


const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseNumber = (numb : unknown) : number =>{
    if (!numb || isNumber(numb)) {
        throw new Error("Incorrect or mising HealthCheck")
    }
    return numb
}


const handleAddEntry = ({ date, description, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge } : Fields) : NewEntryEntry => {
    const entry: NewEntryEntry = {
        date: parseString(date),
        description : parseString(description),
        specialist : parseString(specialist),
        diagnosisCodes : isStringArray(diagnosisCodes),
        healthCheckRating : parseNumber(healthCheckRating)

    }
    switch (type) {
        case "HealthCheck":
            
            break;
        case "OccupationalHealthcare":
            break;
        case "Hospital":
            break;
        default:
            break;
    }

}


export default handleAddEntry