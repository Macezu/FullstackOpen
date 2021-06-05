import express from 'express';
import patientorService from '../services/patientorService';
import handleEntry from '../utilities/handleNewEntry';
import handleAddEntry from '../utilities/handleAddEntry';
const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientorService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = handleEntry(req.body)
        const addedPatient = patientorService.addPatient(newPatient)
        res.json(addedPatient)
    } catch (error) {
        res.status(404).send(error.message)
    }

});

router.get("/:id", (req, res) => {
    console.log("Gettin specific patient with id")
    const patient = patientorService.getPatientWithId(req.params.id)
    return (patient) ? res.send(patient) : res.status(404)
})

router.get("/:id/entries",(req,res) => {
    console.log("Setting Entry to patient")
    const patient = patientorService.getPatientWithId(req.params.id)
    const newEntry = handleAddEntry(req.body)
    patient?.entries.concat(newEntry)
    updatedPatient = patientorService.updatePatient(patient)
    console.log(updatedPatient)
    res.send(updatedPatient)

    return (patient) = res.send(patient) : res.status(404);
    )
}

export default router;