type DicesResult = number []

enum RewardNumberPastry {
    yams = 3,
    square = 2,
    double = 1,
    fail = 0
}

const NUMBER_OF_DICES = 5

function throwDicesResult(dicesNumberToThrow:number):DicesResult {
    const arrayDicesResults:DicesResult = []
    for (let i = 0; i < dicesNumberToThrow; i++) {
        arrayDicesResults[i] = getRandomInt(1, 7)
    }
    console.log(arrayDicesResults);
    return arrayDicesResults;
}

function getRandomInt(min:number, max:number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function countPoints(arrayDicesResults:DicesResult):RewardNumberPastry {

    const arrayCountOccurencesRolls:number[]  = []

    for (let i = 0; i < 5; i++) {
        const diceRoll = i;
        let count = 0;
        for (let i = 0; i < arrayDicesResults.length; i++) {
            const diceResult = arrayDicesResults[i];
            if (diceResult === diceRoll) {
                count++;
            }
        }
        arrayCountOccurencesRolls[i] = count;
    }

    for (let i = 0; i < arrayCountOccurencesRolls.length; i++) {
        const diceRoll = arrayCountOccurencesRolls[i];
        if (diceRoll >= 4) {
            if (diceRoll === 4) return RewardNumberPastry.square;
            else return RewardNumberPastry.yams;
        }
    }

    let countDouble = 0;

    for (let i = 0; i < arrayCountOccurencesRolls.length; i++) {
        const diceRoll = arrayCountOccurencesRolls[i];
        if (diceRoll >= 2) {
            countDouble++;
        }
        if(countDouble >= 2) return RewardNumberPastry.double;
    }

    return RewardNumberPastry.fail;
}

export function play():RewardNumberPastry {
    const arrayDicesResults = throwDicesResult(NUMBER_OF_DICES);
    return countPoints(arrayDicesResults);
}

// console.log(countPoints(throwDicesResult(5)));