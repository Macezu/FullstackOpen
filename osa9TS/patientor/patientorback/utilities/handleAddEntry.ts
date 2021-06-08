import { Discharge, EntryWithoutId, EntryType, SickLeave } from "../types/PatientEntry"


type BaseFields = { date: unknown, description: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, healthCheckRating?: unknown, employerName?: unknown, sickLeave?: unknown, discharge?: unknown };

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isArray = (arr: unknown): arr is Array<string> => {
    return arr instanceof Array
}

const isNumber = (num: unknown): num is number => {
    return typeof num === "number" || num instanceof Number
}

const isEntryType = (param: any): param is EntryType => {
    return Object.values(EntryType).includes(param);
};

const isEntrySickLeave = (param: any): param is SickLeave => {
    return (param as SickLeave).startDate !== undefined
}

const isDischargeType = (param: any): param is Discharge => {
    return (param as Discharge).date !== undefined
}

const isStringArray = (value: unknown): string[] => {
    if (!value || !isArray(value)) {
        throw new Error('Incorrect or missing codes');
    }
    return value;
}

const parseType = (type: unknown): EntryType => {
    if (!type || !isEntryType(type)) {
        throw new Error("Incorrect type");
    }
    return type
}

const parseSickLeave = (leave: unknown): SickLeave => {
    if (!leave || !isEntrySickLeave(leave)) {
        throw new Error("Not a sickleave")
    }
    return leave
}

const parseDischarge = (discharge: unknown): Discharge => {
    if (!discharge || !isDischargeType(discharge)) {
        throw new Error("No discharge")
    }
    return discharge
}


const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
}

const parseNumber = (numb: unknown): number => {
    if (numb === undefined || !isNumber(numb)) {
        throw new Error("Incorrect or mising HealthCheck")
    }
    return numb
}




const handleAddEntry = ({ date, description, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge }: BaseFields): EntryWithoutId | undefined => {
    //jos otetaankin entry ja unkonwn check
    let baseEntry = {
        date: parseString(date),
        description: parseString(description),
        specialist: parseString(specialist),
        diagnosisCodes: isStringArray(diagnosisCodes),
        type: parseType(type)

    }

    switch (baseEntry.type) {
        case "HealthCheck":
            return {
                ...baseEntry,
                healthCheckRating: parseNumber(healthCheckRating)
            }
        case "OccupationalHealthcare":
            if (sickLeave !== undefined) {
                return {
                    ...baseEntry,
                    employerName: parseString(employerName),
                    sickLeave: parseSickLeave(sickLeave)
                }

            }
            else {
                return {
                    ...baseEntry,
                    employerName: parseString(employerName),
                }
            }
        case "Hospital":
            return {
                ...baseEntry,
                discharge: parseDischarge(discharge)
            }
        default:
            return undefined;
    }



}


export default handleAddEntry