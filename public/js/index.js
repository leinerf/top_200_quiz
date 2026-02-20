async function getData() {
    const url = "http://localhost:3000/drugs";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

function updateQuestion(data) {
    let drugQuestion = document.querySelector("#drug");
    let choices = document.querySelectorAll(".quiz-option");
    choices.forEach((choice) => {
        choice.classList.remove("disable");
    })
    let correctChoice;


    drugQuestion.textContent = data.drug;
    document.querySelector("#correct-answer").textContent = "The correct answer is " + data.alternative;
    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        choice.textContent = data.choices[i];
        if (data.choices[i] === data.alternative) {
            correctChoice = choice;
        }
        choice.addEventListener("click", (event) => {
            console.log("i can click")
            document.querySelector("#correct-answer").classList.remove("hide");
            if (event.target.textContent === data.alternative) {
                score++;
            }
            updateScore();

            choices.forEach((choice) => {
                choice.classList.add("disable");
            })


        })
    }


}

function updateScore() {
    document.querySelector("#score").textContent = score;
}

let questionIndex;
let score;

async function startGame() {
    questionIndex = 0;
    score = 0;

    const result = await getData();
    document.querySelector("#total-drugs").textContent = result.length;
    document.querySelector('#next-button').addEventListener("click", () => {
        const data = getNextDrug(result);
        document.querySelector("#correct-answer").classList.add("hide");
        updateQuestion(data);
    })
    const data = getNextDrug(result);
    updateQuestion(data);
    document.querySelector("#retry-button").addEventListener("click", () => {
        window.location.reload();
    });
}

function getNextDrug(result) {
    var questionType = Math.floor((Math.random() * 2) + 1);
    var index = questionIndex;
    questionIndex++;
    if (questionType === 1) {
        return {
            drug: result[index].brand,
            alternative: result[index].generic,
            choices: result[index].generic_choices
        }
    } else {
        return {
            drug: result[index].generic,
            alternative: result[index].brand,
            choices: result[index].brand_choices
        }
    }
}

startGame();