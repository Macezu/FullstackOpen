import express from 'express';
import patientorService from '../services/patientorService';
const router = express.Router();

router.get('/', (_req, res) => {
  console.log('Fetching all diagnoses!');
  res.send(patientorService.getDiagnoses());

});

router.post('/', (_req, res) => {
  console.log('Saving a diagnose!');
  res.send(patientorService.getDiagnoses());
});

export default router;