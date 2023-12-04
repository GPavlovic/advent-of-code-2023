import fs from 'fs';

const FILE_PATH = 'input.txt';

const DIGIT_WORD_MAP = {
    'zero': '0',
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
}

function readFile()
{
    return fs.readFileSync(FILE_PATH).toString().split(/(?:\r\n|\r|\n)/g);
}

function findTwoDigitNumber(string)
{
    let num = '';

    let currIdx = 0;
    let lastSeenInt = null;
    // TODO: Do not split here, instead loop from the left of the string, and for each character check first for digits, then for each entry in the map.
    while (currIdx < string.length)
    {
        // Check for digit first
        if (Number.isInteger(Number.parseInt(string[currIdx])))
        {
            if (num.length == 0) 
            {
                num = string[currIdx];
            }
            lastSeenInt = string[currIdx];
        }
        // Check for digit word
        else
        {
            Object.keys(DIGIT_WORD_MAP).forEach(word =>
            {
                if (string.slice(currIdx).startsWith(word)) 
                {
                    if (num.length == 0) 
                    {
                        num = DIGIT_WORD_MAP[word];
                    }
                    lastSeenInt = DIGIT_WORD_MAP[word];
                }
            });
        }

        currIdx++;
    }

    num += lastSeenInt;
    return num.length > 0 && string.length > 0 ? Number.parseInt(num) : 0;
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
