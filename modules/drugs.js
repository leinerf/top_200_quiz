import { readFileSync } from "fs";
import ps from "prompt-sync";

const file = readFileSync('top_200_drugs.txt', "utf-8");
const lines = file.split("\n");
const drugs = []

for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(";");
    drugs.push({
        "brand": line[0],
        "generic": line[1],
        "classification": line[2],
        "indication": line[3]
    });
}

function createGenericDrugQuestions(offset, limit) {
    const drugSet = drugs.slice(offset, offset + limit);
    const result = []
    for (let i = 0; i < drugSet.length; i++) {
        const drug = drugSet[i];
        const brandChoices = [drug["brand"]];
        const genericChoices = [drug["generic"]];
        while (brandChoices.length < 4) {
            const randomIndex = Math.floor(Math.random() * drugSet.length);
            if (randomIndex === i) {
                continue;
            }
            brandChoices.push(drugSet[randomIndex]["brand"]);
            genericChoices.push(drugSet[randomIndex]["generic"]);
        }

        shuffle(brandChoices);
        shuffle(genericChoices);

        result.push({
            "brand": drug["brand"],
            "generic": drug["generic"],
            "brand_choices": brandChoices,
            "generic_choices": genericChoices
        })
    }
    shuffle(result);
    return result;
}

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}

function drugQuiz(offset, limit) {
    const prompt = ps();
    const questions = createGenericDrugQuestions(offset, limit);
    let start = 0;
    let score = 0;
    const end = questions.length;
    while (start < end) {
        const questionType = Math.floor(Math.random() * 2 + 1);
        const question = questions[start];
        let answer;
        let choices;
        if (questionType === 1) {
            answer = question.generic
            choices = question.generic_choices
            console.log(question.brand)
            console.log(question.generic_choices)
        } else {
            answer = question.brand
            choices = question.brand_choices
            console.log(question.generic)
            console.log(question.brand_choices)
        }
        const userInput = parseInt(prompt("What is your answer 1, 2, 3, 4?\n")) - 1
        const userAnswer = choices[userInput];
        if (userAnswer === answer) {
            score++;
        }
        console.log(`${score}/${questions.length}`)
        console.log(`Answer was: ${answer}`);
        const command = prompt("press [enter] for next question or type exit to stop\n");
        if (command === "exit") {
            return;
        }
        start++;
    }
}

// drugQuiz(0, 100);

export { createGenericDrugQuestions }