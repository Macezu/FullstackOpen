import express from 'express';
import patientorService from '../services/patientorService';
const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientorService.getPatients());
});

router.post('/', (req, res) => {
    
    try {
        const { name, dateOfBirth, ssn, gender, occupation } = req.body;
        const newPatient = patientorService.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        })
        console.log('Saving a patient, no pun intended!');
        res.send(newPatient)

    } catch (error) {
        res.status(400).send(error.message);
    }

});

router.get("/:id", (req, res) => {
    console.log("Gettin specific patient with id")
    const patient = patientorService.getPatientWithId(req.params.id)
    return (patient) ? res.send(patient) : res.status(404)
})

export default router;