import axios from "axios";
import React, { useState } from "react";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";

const DetailedPatient = () => {
  const [{ patients }] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p: Patient): boolean => p.id === id);
  const entries = patient?.entries[0];
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);


  const GetDiagnoses = ({ patientEntries } : { patientEntries : string[] | undefined} ) : ReactElement => {

    if (patientEntries !== undefined && diagnoses !== undefined){
      const found = diagnoses.filter(x => patientEntries.includes(x.code));
      const listed = found.map(x => <li key={x.name}>{x.code} {x.name} {x.latin}</li>);
      console.log(listed);
      return <ul>{listed}</ul>;
    }
    
    return <ul>No Entries</ul>;
  };

  React.useEffect(() => {
  const fetchDiagnoseList = async () => {
    
    try {
      const { data: diagnoseListFromApi }  = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      setDiagnoses(diagnoseListFromApi);
    } catch (e) {
      console.error(e);
    }
  };
  void fetchDiagnoseList();
  },[]);

  console.log(diagnoses);
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
      <GetDiagnoses patientEntries={entries?.diagnosisCodes} />
    </div>
  );
};

export default DetailedPatient;
