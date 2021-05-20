interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (arr: Array<number>, target: number): Result => {

    let avg = arr.reduce((a, b) => a + b) / arr.length
    console.log(avg)

    const metric = (target - avg)
    console.log(metric)
    let rating: number
    if (metric >= 5) { rating = 1 }
    else if (metric <= 0) { rating = 3 }
    else { rating = 2 }

    let desc : string;
    switch (metric) {
        case 1:
            desc = "Terrible job, im dissapointed";
            break;
        case 2:
            desc = "not too bad, but next week we can do better!"
        case 3:
            desc = "you are the ultimate fitness god"
        default:
            desc = "what is dis"
            break;
    }


    let result : Result = {
        "periodLength": arr.length,
        "trainingDays": arr.filter(v => v > 0).length,
        "success": (avg >= target),
        "rating": rating,
        "ratingDescription": desc,
        "target" : target,
        "average": avg,
    }

    return result
    
}

try {
    calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2)
    //TODO(h, w);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}