//CHRONO

let seconds = 00;
let tens = 00;
let mins = 00;
let getSeconds = document.querySelector(".seconds");
let getTens = document.querySelector(".tens");
let getMins = document.querySelector(".mins");
let btnStart = document.querySelector(".btn-start");
let btnStop = document.querySelector(".btn-stop");
let btnReset = document.querySelector(".btn-reset");
let interval;
let click_start = document.querySelectorAll(".memory-game .memory-card");

click_start.forEach((clickStr) => {
  clickStr.addEventListener("click", () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
  });
});

btnStop.addEventListener("click", () => {
  clearInterval(interval);
});
btnReset.addEventListener("click", () => {
  clearInterval(interval);
  tens = "00";
  seconds = "00";
  mins = "00";
  getSeconds.innerHTML = seconds;
  getTens.innerHTML = tens;
  getMins.innerHTML = mins;
});

function startTimer() {
  tens++;
  if (tens <= 9) {
    getTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    getTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    getSeconds.innerHTML = "0" + seconds;
    tens = 0;
    getTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    getSeconds.innerHTML = seconds;
  }
  if (seconds > 59) {
    mins++;
    getMins.innerHTML = "0" + mins;
    seconds = 0;
    getSeconds.innerHTML = "0" + 0;
  }
  if (mins > 9) {
    getSeconds.innerHTML = mins;
  }
}

//END CHRONO

//START counted
let click_card = document.querySelectorAll(".memory-game .memory-card");
let number = 0;

click_card.forEach((card) => {
  card.addEventListener("click", () => {
    number++;
    document.getElementById("clicks").innerHTML = " " + number;
  });
});

//END counted

const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //first Click
    hasFlippedCard = true;
    firstCard = this;
  } else {
    //Second Click
    secondCard = this;

    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  //do cards match?
  isMatch ? disableCards() : unflipCards();
}
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuflle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);

    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
