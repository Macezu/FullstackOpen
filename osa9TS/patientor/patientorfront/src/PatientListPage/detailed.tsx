import axios from "axios";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Container,  Icon ,Divider } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { List } from 'semantic-ui-react';
import { Diagnosis, Patient, Entry , HealthCheckRating } from "../types";

const healthCheckIcon = ( { healthCheckRating} : { healthCheckRating : HealthCheckRating}  ) : ReactElement =>{
  switch (healthCheckRating) {
    case HealthCheckRating.LowRisk:      
      return <Icon size="large" name="heart" />;
    case HealthCheckRating.Healthy:
      return <Icon size="big" name="accessible" />;
    case HealthCheckRating.HighRisk:
      return <Icon size="huge" name="alarm" />;
    case HealthCheckRating.CriticalRisk:
      return <Icon size="big" name="deaf" />;
    default:
      return <li></li>;
  }
};




const DetailedPatient = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (p: Patient): boolean => p.id === id
  );
  const entries = patient?.entries;
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  console.log(diagnoses);

  const EntryMapped = ({entries} : {entries : Array<Entry> | undefined}) :ReactElement => {
    if (entries) {
      console.log(entries);
      
      const mapped = entries.map(entry => {
        switch (entry.type) {
          case "HealthCheck":
            return <List.Item 
                      content={[entry.date, entry.description , entry.specialist]} icon={healthCheckIcon(entry)}/>;
          case "Hospital":
            return <List.Item
              content={[entry.date, entry.description ,entry.specialist ,entry.discharge]}/>;
          case "OccupationalHealthcare":
            return <li>{entry.date}{entry.description}{entry.specialist}{entry.employerName}{entry.sickLeave}</li>;
          default:
            return assertNever(entry);
        }
      });

      return <List>{mapped}</List>;  
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
      <Container fluid textAlign="left">
      <Divider horizontal>Entries</Divider>
      <EntryMapped entries={entries} />
      </Container>
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default DetailedPatient;
