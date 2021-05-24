import express from 'express';
import patientorService from '../services/patientorService';
const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching all patients!');
    res.send(patientorService.getPatients());
});

router.post('/', (_req, res) => {
    res.send('Saving a patient, no pun intended!');
});

export default router;