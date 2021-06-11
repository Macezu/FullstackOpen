import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import { EntryType, HealthCheckRating } from "../types";

export type TypeOption = {
  value: HealthCheckRating;
  label: string;
};

// props for select field component
type SelectEntryFieldProps = {
  name: string;
  label: string;
  options: TypeOption[];
};

export const SelectEntryField = ({
    name,
    label,
    options
  }: SelectEntryFieldProps) => (
    <Form.Field>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </Form.Field>
  );
  
