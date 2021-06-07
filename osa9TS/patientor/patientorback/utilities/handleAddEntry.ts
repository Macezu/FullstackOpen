import { NewEntryEntry, EntryType, EntryWithoutId, BaseEntry, NewHospitalEntry, NewOccupationalEntry, NewHealthCheckEntry } from "../types/PatientEntry"


type Fields = { date: unknown, description: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, healthCheckRating? : unknown, employerName? : unknown, sickLeave? : unknown, discharge? : unknown  };


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isArray = (arr : unknown): arr is Array<string> =>{
    return arr instanceof Array
}

const isNumber = (num : unknown): num is number => {
    return typeof num === "number" || num instanceof Number
}

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const isStringArray = (value : unknown) :string[] => {
    if (!value ||!isArray(value) || isString(value[0])){
        throw new Error('Incorrect or missing codes');
    }
    return value;
}

const parseType = (type : unknown) : EntryType => {
    if (!type ||!isEntryType(type)) {
        throw new Error("Incorrect type");
    }
    return type
}


const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseNumber = (numb : unknown) : number =>{
    if (!numb || !isNumber(numb)) {
        throw new Error("Incorrect or mising HealthCheck")
    }
    return numb
}

const whatEntry = (entry : EntryWithoutId) : EntryWithoutId => {
    parseType(entry.type)
    switch (entry.type) {
        case "HealthCheck":
            handleAddEntry(entry)
            return entry;
        case "OccupationalHealthcare":
            entry = {
                ...entry,

            }
            return entry;
        case "Hospital":
            return entry;
        default:
            return undefined;
    }
} 


const handleAddEntry = ({ date, description, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge } : Fields) : EntryWithoutId => {
    //jos otetaankin entry ja unkonwn check
    let entry = {
        date: parseString(date),
        description : parseString(description),
        specialist : parseString(specialist),
        diagnosisCodes : isStringArray(diagnosisCodes),
        type : parseType(type)

    }
    switch (type) {
        case "HealthCheck":
            entry = {
                ...entry,
                healthCheckRating : parseNumber(healthCheckRating)
            }
            return entry;
        case "OccupationalHealthcare":
            entry = {
                ...entry,

            }
            return entry;
        case "Hospital":
            return entry;
        default:
            return undefined;
    }

}


export default handleAddEntry