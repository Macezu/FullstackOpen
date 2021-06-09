import { State } from "./state";
import { Patient, BaseEntry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  |
  {
    type: "GET_PATIENT";
    payload: Patient;
  }
  |
  {
    type: "ADD_ENTRY";
    payload: BaseEntry;
  };
  



export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_PATIENT":
      return {
        ...state,
        patients: {
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setPatients = (payload: Patient[]): Action => {
  return ({
    type: "SET_PATIENT_LIST",
    payload: payload
  });
};

export const addPatient = (data : Patient): Action =>{
  return ({
    type: "ADD_PATIENT",
    payload: data
  });
};

export const addEntry = (data : BaseEntry): Action =>{
  return ({
    type: "ADD_ENTRY",
    payload: data
  });
};

export const getPatient = (data : Patient): Action =>{
  return({
    type:"GET_PATIENT",
    payload:data
  });
};
