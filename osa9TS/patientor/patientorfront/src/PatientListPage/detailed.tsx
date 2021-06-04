
import React from "react";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Icon,
  Divider,
  List,
  Segment,
  Header,
} from "semantic-ui-react";
import HealthCheckSegment from "../components/HealthCheckSegment";
import HospitalSegment from "../components/HospitalSegment";
import { useStateValue } from "../state";
import { Patient, Entry } from "../types";



const DetailedPatient = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (p: Patient): boolean => p.id === id
  );
  const entries = patient?.entries;

  const EntryMapped = ({entries}: {entries: Array<Entry> | undefined;}): ReactElement => {
    console.log(entries);
    if (entries && entries.length > 0) {
      const mapped = entries.map((entry) => {
        switch (entry.type) {
          case "HealthCheck":
            return HealthCheckSegment(entry);
          case "Hospital":
            return HospitalSegment(entry);
          case "OccupationalHealthcare":
            return (
              <Segment raised>
                <List.Item
                  content={[
                    entry.date,
                    entry.description,
                    entry.specialist,
                    entry.employerName,
                    entry.sickLeave?.startDate,
                    entry.sickLeave?.startDate
                  ]}
                />
              </Segment>
            );
          default:
            return assertNever(entry);
        }
      });

      return <div>{mapped}</div>;
    }
    else {return <Header as="h3" textAlign="center">No Entries</Header>;}
  };



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


