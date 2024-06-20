const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const resultEle = document.getElementById("result");
let tieCount = 0;
let tieStreak = 1;
let winCount = 0;
let winStreak = 1;
let lossCount = 0;
let lossStreak = 1;
const winCountEle = document.getElementById("win-count-num");
const lossCountEle = document.getElementById("loss-count-num");
const tieCountEle = document.getElementById("tie-count-num");

rock.addEventListener("click", () => {
  playGame("rock");
});
paper.addEventListener("click", () => {
  playGame("paper");
});
scissors.addEventListener("click", () => {
  playGame("scissors");
});

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

function computerChoice() {
  const randNum = getRandomIntInclusive(1, 3);
  // console.log(randNum);
  if (randNum === 1) {
    return "rock";
  } else if (randNum === 2) {
    return "paper";
  } else if (randNum === 3) {
    return "scissors";
  }
}

function streakCheck(winLossTie) {
  switch (winLossTie) {
    case "win":
      if (resultEle.textContent.includes("Win")) {
        winStreak++;
        console.log(winStreak);
        resultEle.textContent = `Win x${winStreak}`;
      } else {
        winStreak = 1;
        resultEle.textContent = "Win";
      }
      break;

    case "loss":
      if (resultEle.textContent.includes("Lose")) {
        loseStreak++;
        console.log(loseStreak);
        resultEle.textContent = `Lose x${loseStreak}`;
      } else {
        loseStreak = 1;
        resultEle.textContent = "Lose";
      }
      break;

    case "tie":
      if (resultEle.textContent.includes("Tie")) {
        tieStreak++;
        console.log(tieStreak);
        resultEle.textContent = `Tie x${tieStreak}`;
      } else {
        tieStreak = 1;
        resultEle.textContent = "Tie";
      }
      break;
  }
}

function playerLose() {
  resultEle.classList.add("loss");
  resultEle.classList.remove("win");
  streakCheck("loss"); // Is it weird to manually feed an arg like this?
  // I couldnt find a way to make streakCheck change seamlessly with arguments,
  // so i used switch statements that used slightly different code
  // I think streakCheck makes this a little more readable.
  lossCount++;
  console.log(`Loss count: ${lossCount}`);
  lossCountEle.textContent = lossCount;
}

function playerWin() {
  resultEle.classList.add("win");
  resultEle.classList.remove("loss");
  streakCheck("win");
  winCount++;
  console.log(`Win count: ${winCount}`);
  winCountEle.textContent = winCount;
}

function tie() {
  resultEle.classList.remove("win", "loss");
  streakCheck("tie");
  tieCount++;
  console.log(`Tie count: ${tieCount}`);
  tieCountEle.textContent = tieCount;
}

function playGame(playerChoice) {
  const computerChoiceResult = computerChoice();
  console.log(`You: ${playerChoice}
Computer: ${computerChoiceResult}`);

  if (playerChoice === computerChoiceResult) {
    tie();
  } else if (playerChoice === "rock" && computerChoiceResult === "paper") {
    playerLose();
  } else if (playerChoice === "rock" && computerChoiceResult === "scissors") {
    playerWin();
  } else if (playerChoice === "paper" && computerChoiceResult === "rock") {
    playerWin();
  } else if (playerChoice === "paper" && computerChoiceResult === "scissors") {
    playerLose();
  } else if (playerChoice === "scissors" && computerChoiceResult === "paper") {
    playerWin();
  } else if (playerChoice === "scissors" && computerChoiceResult === "rock") {
    playerLose();
  }
}
