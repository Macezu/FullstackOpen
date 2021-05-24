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

router.get("/:id", (req,res) =>{
    console.log(`Looking for ID: ${req.params.id}`)
    const diagnose = patientorService.getDiagnoseWithCode(req.params.id);
    return (diagnose) ? res.send(diagnose) : res.status(404); 
})

export default router;