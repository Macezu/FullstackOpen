import React,{ ReactElement } from "react";
import { Header } from "semantic-ui-react";
import HealthCheckSegment from "../components/HealthCheckSegment";
import HospitalSegment from "../components/HospitalSegment";
import OccupationalHCSegment from "../components/OccupationalHCSegment";
import { Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryMapped = ({
  entries
}: {
  entries: Array<Entry> | undefined;
}): ReactElement => {

  if (entries && entries.length > 0) {
    const mapped = entries.map((entry) => {
      switch (entry.type) {
        case "HealthCheck":
          return HealthCheckSegment(entry);
        case "Hospital":
          return HospitalSegment(entry);
        case "OccupationalHealthcare":
          return OccupationalHCSegment(entry);
        default:
          return assertNever(entry);
      }
    });

    return <div>{mapped}</div>;
  } else {
    return (
      <Header as="h3" textAlign="center">
        No Entries
      </Header>
    );
  }
};

export default EntryMapped;
