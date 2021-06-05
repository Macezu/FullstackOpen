import { NewEntryEntry } from "../types/PatientEntry"

type Fields = { date: unknown, description: unknown, specialist: unknown, diagnosisCodes: unknown, type: unknown, healthCheckRating : unknown, employerName : unknown, sickLeave : unknown, discharge : unknown  };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}


const handleAddEntry = ({ date, description, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave?, discharge } : Fields) : NewEntryEntry => {
    const entry: NewEntryEntry = {
        date: parseString(date),
        description : parseString(description),
        specialist : parseString(specialist),
        diagnosisCodes : parseString(diagnosisCodes)

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