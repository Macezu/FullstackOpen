
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface argsArray{
    arr : Array<number>;
    target : number;
}

const handleArguments = (args: Array<string>): argsArray => {
    if (args.length < 5) throw new Error('Not enough arguments');
    const newArgs : Array<string> = args.slice(3)
    const targetn = Number(args[2])
    if (newArgs.every(x => (!isNaN(Number(x)))) && !isNaN(Number(targetn))) {
        return {
            arr : newArgs.map(x => Number(x)),
            target : targetn
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (arr: Array<number>, target: number): Result => {
    let rating: number
    let desc: string;

    try {
        let avg = arr.reduce((a, b) => a + b) / arr.length
        const metric = (arr[arr.length] - avg)
        if (metric >= 5) { rating = 1 }
        else if (metric <= 0) { rating = 3 }
        else { rating = 2 }

        switch (rating) {
            case 1:
                desc = "Terrible job, im dissapointed";
                break;
            case 2:
                desc = "not too bad, but next week we can do better!";
                break;
            case 3:
                desc = "you are the ultimate fitness god";
                break;
            default:
                desc = "what is dis"
                break;
        }

        let result: Result = {
            "periodLength": arr.length,
            "trainingDays": arr.filter(v => v > 0).length,
            "success": (avg >= target),
            "rating": rating,
            "ratingDescription": desc,
            "target": target,
            "average": avg,
        }

        return result

    } catch (error) {

    }

}

try {
    const { arr, target } = handleArguments(process.argv)
    console.log(calculateExercises(arr, target))
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}