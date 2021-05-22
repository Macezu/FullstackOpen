

interface MassValues {
    value1: number;
    value2: number;
  }


const parseArguments = (args: Array<string>): MassValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


export const calculateBmi = (h: number, w: number): string => {
    const bmi: number = w / ((h / 100) * (h / 100));
    if (bmi >= 40) { return "Obese Class III (Very severely obese)"; }
    else if (bmi >= 35) { return "Obese Class II (Severely obese)"; }
    else if (bmi >= 30) { return "Obese Class I (Moderately obese)"; }
    else if (bmi >= 25) { return "Overweight"; }
    else if (bmi >= 18.5) { return "Normal (healthy weight)"; }
    else if (bmi >= 16) { return "Underweight"; }
    else if (bmi >= 15) { return "Severely underweight"; }
    else if (bmi < 15) { return "Very severely underweight"; }
    else throw new Error('Could not calculate BMI!');

};


try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} catch (e) {
    console.log('Error, something bad happened, message: ', e);
}
