import axios from "axios";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Patient, Entry } from "../types";






const DetailedPatient = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (p: Patient): boolean => p.id === id
  );
  const entries = patient?.entries;
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);


  const EntryMapped = ({entries} : {entries : Array<Entry> | undefined}) :ReactElement => {
    if (entries) {
      
      const mapped = entries.forEach(entry => {
        switch (entry.type) {
          case "HealthCheck":
            return entry.healthCheckRating;
          case "Hospital":
            return entry.specialist;
          case "OccupationalHealthcare":
            return entry.employerName;
          default:
            return assertNever(entry);
        }
      });
  
      console.log(mapped);
      return <ul></ul>;  
    }
    return <ul></ul>;
  };
  

  React.useEffect(() => {
    const fetchDiagnoseList = async () => {
      try {
        const { data: diagnoseListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnoses(diagnoseListFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnoseList();
  }, []);

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
      <h5>entries</h5>
      <EntryMapped entries={entries} />
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default DetailedPatient;
