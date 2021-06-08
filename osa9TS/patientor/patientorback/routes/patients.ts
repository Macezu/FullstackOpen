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
        res.status(404).send(error)
    }

});

router.get("/:id", (req, res) => {
    console.log("Gettin specific patient with id")
    const patient = patientorService.getPatientWithId(req.params.id)
    return (patient) ? res.send(patient) : res.status(404)
})

router.post("/:id/entries", (req, res) => {
    console.log("Setting Entry to patient")

        const newEntry = handleAddEntry(req.body)
        if (newEntry){
            const updatedPatient = patientorService.updatePatient(newEntry, req.params.id)
            console.log(updatedPatient)
            res.send(updatedPatient)
        }
        res.status(404)
        

        
    
})

export default router;