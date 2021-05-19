
type Result = number | string


interface MultiplyValues {
    h: number;
    w: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            h: Number(args[2]),
            w: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

try {
    const { h, w } = parseArguments(process.argv);
    //TODO(h, w);
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}