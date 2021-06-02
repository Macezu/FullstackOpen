import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import {  Patient, Diagnosis } from "../types";

const diagnoseCodes = ({code} : { code : string}) : React.JSXElementConstructor =>{
  return <li>code</li>
}

const DetailedPatient = () => {
  const [{ patients } ] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p : Patient) : boolean => p.id === id);
  const entries  = patient?.entries[0];
  console.log(entries);
  return (
    <div>
      <h2>{patient?.name} {patient?.gender === "male" ? (
              <Icon size="small" name="mars" />
            ) : patient?.gender === "female" ? (
              <Icon size="small" name="venus" />
            ) : (
              <Icon size="small" name="genderless" />
            )}</h2>
      
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h5>entries</h5>
      <p>{entries?.date} {entries?.description}</p>
      <ul>
        {entries?.diagnosisCodes?.forEach(x => diagnoseCodes(x))}
      </ul>
    </div>
  );
};

export default DetailedPatient;
