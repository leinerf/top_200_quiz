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
    var question = document.querySelector("#question");
    var choices = document.querySelectorAll(".quiz-option");
    var correctChoice;

    question.textContent = "Guess the Brand or Generic for " + data.drug;

    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        choice.textContent = data.choices[i];
        if (data.choices[i] === data.alternative) {
            correctChoice = choice;
        }
        choice.addEventListener("click", (event) => {
            if (!allowClicks) {
                return;
            }
            allowClicks = false;
            if (event.target.textContent != data.alternative) {
                event.target.setAttribute('id', "wrong");
            } else {
                score++;
            }
            correctChoice.setAttribute('id', "correct");
            updateScore();
        })
    }


}

function updateScore() {
    document.querySelector("#score").textContent = score;
}

let questionIndex;
let score;
let allowClicks;

async function startGame() {
    questionIndex = 0;
    score = 0;
    allowClicks = true;

    const result = await getData();
    document.querySelector("#total-drugs").textContent = result.length;
    document.querySelector('#next-button').addEventListener("click", () => {
        const data = getNextDrug(result);
        updateQuestion(data);
        allowClicks = true;

        const wrong = document.querySelector("#wrong");
        if (wrong) {
            wrong.removeAttribute("id")
        }
        document.querySelector("#correct").removeAttribute("id")
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