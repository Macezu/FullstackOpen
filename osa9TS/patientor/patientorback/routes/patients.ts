import express from 'express';
import patientorService from '../services/patientorService';
import handleEntry from '../utilities/handleNewEntry';
const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientorService.getPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = handleEntry(req.body)
        patientorService.addPatient(newPatient)
        res.json(newPatient)
    } catch (error) {
        res.status(404).send(error.message)
    }

});

router.get("/:id", (req, res) => {
    console.log("Gettin specific patient with id")
    const patient = patientorService.getPatientWithId(req.params.id)
    return (patient) ? res.send(patient) : res.status(404)
})

export default router;