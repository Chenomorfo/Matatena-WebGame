const setPlayers = () => {
  /* Giving the players their columns */
  for (let i = 0; i < 3; i++) {
    document
      .getElementById("Player1")
      .appendChild(createColumn(i, player1, player2));
  }

  for (let i = 0; i < 3; i++) {
    document
      .getElementById("Player2")
      .appendChild(createColumn(i, player2, player1));
  }
};

const createColumn = (Ncol, player, rival) => {
  /* config the column */
  let col = document.createElement("div");
  col.classList.add("column");
  col.addEventListener("click", (e) => {
    if (!player.YouTurn) return;
    if (!setDice(col, dice)) return;

    //PLS DONT BROKE YOURSELF
    switch (Ncol) {
      case 0:
        player.Column1.push(dice.value);
        rival.Column1 = rival.Column1.filter((item) => {
          return item != dice.value;
        });
        DeleteDice(dice, rival.DrawCols[0]);
        break;

      case 1:
        player.Column2.push(dice.value);
        rival.Column2 = rival.Column2.filter((item) => {
          return item != dice.value;
        });
        DeleteDice(dice, rival.DrawCols[1]);
        break;
      case 2:
        player.Column3.push(dice.value);
        rival.Column3 = rival.Column3.filter((item) => {
          return item != dice.value;
        });
        DeleteDice(dice, rival.DrawCols[2]);
        break;
    }

    UpdateScores(player1, player2);

    if (CheckAllPlayerMoves(player)) {
      player1.YouTurn = false;
      player2.YouTurn = false;
    }

    nextDice();
  });

  /* Create single rows in the column */
  for (let i = 0; i < 3; i++) {
    col.appendChild(createRow());
  }
  return col;
};
const createRow = () => {
  let row = document.createElement("div");
  row.classList.add("row");

  return row;
};

//Create & set players
let player1 = new Player();
let player2 = new Player();

/* Player One always start */
player1.YouTurn = true;
player2.YouTurn = false;

/* For the visual Dices (does not affect the points) */
player1.DrawCols = document.getElementById("Player1").childNodes;
player2.DrawCols = document.getElementById("Player2").childNodes;

//Create random Dice
var dice;

const nextDice = () => {
  dice = new Dice();

  let Number = Math.floor(Math.random() * 6);
  let randomDice = document.createElement("div");
  randomDice.classList.add("PreDice");
  randomDice.setAttribute('id','RandomDice')
  randomDice.innerHTML = Dices[Number];

  document.getElementById("Table").appendChild(randomDice);
  randomDice.style.scale = (window.innerWidth > 750 ? 100 : 50) + "%";

  dice.elem = Dices[Number];
  dice.value = Number + 1;
};

window.addEventListener('resize', e=>{
  document.getElementById('RandomDice').style.scale = (window.innerWidth > 750 ? 100 : 50) + "%";
})

/* Start Game */
setPlayers();
nextDice();
