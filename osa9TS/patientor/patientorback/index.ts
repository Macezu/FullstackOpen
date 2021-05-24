import express from 'express';
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';


const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});