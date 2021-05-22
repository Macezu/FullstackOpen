import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Welcome Stranger!');
});


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        const values = {
            height: Number(req.query.height),
            weight: Number(req.query.weight)
        };

        const desc: string = calculateBmi(values.height, values.weight);

        res.json({
            ...values,
            "bmi": desc
        });

    } else {
        res.json({ error: "malformatted parameters" });
    }

});

app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (req.body.daily_exercises && req.body.target){
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        res.json(calculateExercises(daily_exercises, target));
    } else {
        res.json({ error: "parameters missing" });
    }

});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});