import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";

const DetailedPatient = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p) => p.id === id);
  console.log(patient);

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
      
    </div>
  );
};

export default DetailedPatient;
