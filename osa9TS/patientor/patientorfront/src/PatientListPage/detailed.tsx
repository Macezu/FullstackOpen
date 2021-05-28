import React from "react";
import { Patient } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";
import { Table } from "semantic-ui-react";

const DetailedPatient = (patients : Array<Patient>) => {
    return (
        <Table.Body>
              {Object.values(patients).map((patient: Patient) => (
                <Table.Row key={patient.id}>
                  <Table.Cell>{patient.name}</Table.Cell>
                  <Table.Cell>{patient.gender}</Table.Cell>
                  <Table.Cell>{patient.occupation}</Table.Cell>
                  <Table.Cell>
                    <HealthRatingBar showText={false} rating={1} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
    );
};

export default DetailedPatient;