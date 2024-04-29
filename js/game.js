const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const spanTimer = document.querySelector(".timer");
const container = document.querySelector("#container");

const characters = [
  "beth",
  "jerry",
  "jessica",
  "morty",
  "pessoa-passaro",
  "pickle-rick",
  "rick",
  "summer",
  "meeseeks",
  "scroopy",
];

let counter = 0;
let minutes = 0;
let seconds = 0;

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll(".disabled-card");

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${spanTimer.innerHTML}`
    );
    container.hidden = false;
  }
};

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  if (firstCharacter === secondCharacter) {
    setTimeout(() => {
      firstCard.firstChild.classList.add("disabled-card");
      secondCard.firstChild.classList.add("disabled-card");
      firstCard = "";
      secondCard = "";
      checkEndGame();
    }, 400);
  } else {
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      firstCard = "";
      secondCard = "";
    }, 750);
  }
};

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

const createCard = (character) => {
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener("click", revealCard);
  card.setAttribute("data-character", character);

  return card;
};

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
};

const convertToTwoDigit = (num) => {
  if (num < 0) {
    return ("0" + Math.abs(num)).slice(-2);
  } else {
    return ("0" + num).slice(-2);
  }
};

const startTimer = () => {
  this.loop = setInterval(() => {
    counter += 1;

    if (counter === 60) {
      counter = 0;
      minutes += 1;
      seconds = 0;
    } else {
      seconds = counter;
    }

    spanTimer.innerHTML = `${convertToTwoDigit(minutes)}:${convertToTwoDigit(
      seconds
    )}`;
  }, 1000);
};

const playAgain = () => {
  container.hidden = true;
  counter = 0;
  minutes = 0;
  seconds = 0;
  spanTimer.innerHTML = "00:00";
  grid.replaceChildren([]);

  startTimer();
  loadGame();
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("player");
  startTimer();
  loadGame();
};
