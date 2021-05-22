import express from "express"
import { calculateBmi } from "./bmiCalculator"
const app = express();


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        const values = {
            height: Number(req.query.height),
            weight: Number(req.query.weight)
        }

        const desc: string = calculateBmi(values.height, values.weight)

        res.json({
            ...values,
            "bmi": desc
        });

    } else {
        res.json({ error: "malformatted parameters" });
    }

});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});