import axios from "axios";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Icon,
  Divider,
  List,
  Segment,
  Header
} from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Patient, Entry, HealthCheckRating } from "../types";

const healthCheckIcon = ({
  healthCheckRating
}: {
  healthCheckRating: HealthCheckRating;
}): ReactElement => {
  switch (healthCheckRating) {
    case HealthCheckRating.Healthy:
      return <Icon size="big" name="heart" />;
    case HealthCheckRating.LowRisk:
      return <Icon size="large" name="band aid" />;
    case HealthCheckRating.HighRisk:
      return <Icon size="huge" name="alarm" />;
    case HealthCheckRating.CriticalRisk:
      return <Icon size="big" name="frown" />;
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

  const EntryMapped = ({entries}: {entries: Array<Entry> | undefined;}): ReactElement => {
    if (entries) {

      const mapped = entries.map((entry) => {
        switch (entry.type) {
          case "HealthCheck":
            return (
              <Segment.Group horizontal>
                <Segment.Group raised>
                  <Segment>{healthCheckIcon(entry)} {entry.date}</Segment>
                  <Segment>{entry.description}</Segment>
                </Segment.Group>
                <Segment.Group>
                  <Segment>
                    <Header as="h4">Specialist: </Header>
                  </Segment>
                  <Segment textAlign="center"><i>{entry.specialist}</i></Segment>
                </Segment.Group>
                <Segment.Group >
                  <Segment color="green"><Header as="h5" icon><Icon size="huge" name="clipboard" />{entry.type}</Header></Segment>
                </Segment.Group>
              </Segment.Group>
            );
          case "Hospital":
            return (
              <Segment raised>
                <List.Item
                  content={[
                    entry.date,
                    entry.description,
                    entry.specialist,
                    entry.discharge.date,
                    entry.discharge.criteria
                  ]}
                />
                ;
              </Segment>
            );
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
