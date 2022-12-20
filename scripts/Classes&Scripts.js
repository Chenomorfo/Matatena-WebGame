//Entities
class Player {
  Score = 0;

  Column1 = [];
  Column2 = [];
  Column3 = [];

  Dice = 0;

  YouTurn = null;
  DrawCols = null;

  CalculateScore = () => {
    this.Score = 0;
    this.Score += checkRepeat(this.Column1);
    this.Score += checkRepeat(this.Column2);
    this.Score += checkRepeat(this.Column3);
  };
}

class Dice {
  value = 0;

  elem = null;
}

//GameRules & Functions
const checkRepeat = (array) => {
  let score = 0;

  let sortArray = array.sort();

  let current = 0;
  let cnt = 1;

  sortArray.forEach((elem) => {
    if (elem != current) {
      score += Math.pow(current, cnt);
      current = elem;
      cnt = 1;
    } else cnt++;
  });
  score += Math.pow(current, cnt);

  return score;
};

const UpdateScores = (player1, player2) => {
  player1.CalculateScore();
  player2.CalculateScore();

  document.getElementById("P1Score").childNodes[1].innerHTML = player1.Score;
  document.getElementById("P2Score").childNodes[1].innerHTML = player2.Score;

  player1.YouTurn = !player1.YouTurn;
  player2.YouTurn = !player2.YouTurn;
};

const CheckAllPlayerMoves = (player) => {
  if (
    player.Column1.length == 3 &&
    player.Column2.length == 3 &&
    player.Column3.length == 3
  ) {
    alert("A player Won, A player Lose");
    return true;
  }
  return false;
};

createDice = (content) => {
  let dice = document.createElement("div");
  dice.classList.add("Dice");
  dice.innerHTML = content;

  return dice;
};

setDice = (elem, dice) => {
  if (dice === undefined) return;

  for (let i = 0; i < elem.childNodes.length; i++) {
    if (elem.childNodes[i].innerHTML == "") {
      elem.childNodes[i].appendChild(createDice(dice.elem));
      return true;
    }
  }
  return false;
};

DeleteDice = (dice, rival) => {
  if (dice === undefined) return;

  let tempDice = '<div class="Dice">' + Dices[dice.value - 1] + "</div>";

  for (let i = 0; i < rival.childNodes.length; i++) {
    if (rival.childNodes[i].innerHTML === tempDice)
      rival.childNodes[i].innerHTML = "";
  }
};

//Dices
const D1 = () => {
  return `
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div class="dot"></div>
  `;
};
const D2 = () => {
  return `<div></div>
<div></div>
<div class="dot"></div>
<div></div>
<div></div>
<div></div>
<div class="dot"></div>
`;
};
const D3 = () => {
  return `
<div class="dot"></div>
<div></div>
<div></div>
<div></div>
<div class="dot"></div>
<div></div>
<div></div>
<div></div>
<div class="dot"></div>
`;
};
const D4 = () => {
  return `
<div class="dot"></div>
<div></div>
<div class="dot"></div>
<div></div>
<div></div>
<div></div>
<div class="dot"></div>
<div></div>
<div class="dot"></div>
`;
};
const D5 = () => {
  return `
<div class="dot"></div>
<div></div>
<div class="dot"></div>
<div></div>
<div class="dot"></div>
<div></div>
<div class="dot"></div>
<div></div>
<div class="dot"></div>`;
};
const D6 = () => {
  return `
<div class="dot"></div>
<div></div>
<div class="dot"></div>
<div class="dot"></div>
<div></div>
<div class="dot"></div>
<div class="dot"></div>
<div></div>
<div class="dot"></div>
`;
};

const Dices = [D1(), D2(), D3(), D4(), D5(), D6()];
