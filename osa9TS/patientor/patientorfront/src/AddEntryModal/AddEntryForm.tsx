import { Formik, Field } from "formik";
import { Form, Grid, Button } from "semantic-ui-react";
import { TypeOption } from "../AddEntryModal/EntryFormField";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { SelectEntryField } from "../AddEntryModal/EntryFormField";
import React from "react";
import { EntryType } from "../types";
import { Entry } from "../types";

export type EntryFormValues = Omit<Entry, "id">;


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheckEntry, label: "HealthCheck" },
  { value: EntryType.HospitalEntry, label: "Hospital" },
  {
    value: EntryType.OccupationalHealthcareEntry,
    label: "OccupationalHealthcare"
  }
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes:[],
        type: EntryType.HealthCheckEntry
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="DiagnosisCodes"
              placeholder="DiagnosisCodes"
              name="diagnosisCodes"
              component={DiagnosisSelection}
            />
            <SelectEntryField label="EntryType" name="entryType" options={typeOptions} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
