import fs from 'fs';

const FILE_PATH = 'input.txt';

function readFile()
{
    return fs.readFileSync(FILE_PATH).toString().split(/(?:\r\n|\r|\n)/g);
}

function findTwoDigitNumber(string)
{
    let num = '';
    const blownUpString = string.split("");

    if (blownUpString.length > 0)
    {
        let lastSeenInt = null;

        blownUpString.forEach(c =>
        {
            if (Number.isInteger(Number.parseInt(c)))
            {
                if (num.length == 0) 
                {
                    num = c;
                }
                lastSeenInt = c;
            }
        });

        num += lastSeenInt;
    }
    return num.length > 0 ? Number.parseInt(num) : 0;
}

function processStrings(strings)
{
    let sum = 0;

    strings.forEach(str =>
    {
        const numberToAdd = findTwoDigitNumber(str);
        console.log(numberToAdd);
        sum += numberToAdd;
    });

    return sum;
}


console.time('test');

console.log(`Sum: ${processStrings(readFile())}`);

console.timeEnd('test');
