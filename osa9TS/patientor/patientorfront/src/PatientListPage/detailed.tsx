import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Icon,
  Divider,
} from "semantic-ui-react";

import { useStateValue } from "../state";
import { Patient } from "../types";
import EntryMapped from "./entrymapped";



const DetailedPatient = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (p: Patient): boolean => p.id === id
  );
  const entries = patient?.entries;

  
 if (patient){
  return (
    <div>
      <h2>
        {patient?.name}{" "}
        {patient?.gender === "male" ? (
          <Icon size="small" name="mars" />
        ) : patient?.gender === "female" ? (
          <Icon size="small" name="venus" />
        ) : (
          <Icon size="small" name="genderless" />
        )}
      </h2>

      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <Container fluid textAlign="left">
        <Divider horizontal>Entries</Divider>
        <EntryMapped key={patient.id} entries={entries} />
      </Container>
    </div>
  );
 }
 return <></>;

};



export default DetailedPatient;


