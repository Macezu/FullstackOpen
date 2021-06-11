import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Icon,
  Divider,
  Button,
} from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal/entryindex";
import { apiBaseUrl } from "../constants";
import { addEntry, useStateValue } from "../state";
import { Patient } from "../types";
import EntryMapped from "./entrymapped";



const DetailedPatient = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(
    (p: Patient): boolean => p.id === id
  );
  const entries = patient?.entries;
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };


  const submitNewEntry = async (values: EntryFormValues) => {
    // get current patient and then post
    console.log("here");
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/${id}/entries`,
        values
      );
      console.log(newEntry);
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.log(e.response?.data || 'Unknown Error');
    }
  };

  
 if (patient){
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Container fluid textAlign="left">
        <Divider horizontal>Entries</Divider>
        <EntryMapped key={patient.id} entries={entries} />
      </Container>
    </div>
  );
 }
 return <></>;

};



export default DetailedPatient;


