const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");
const form = document.querySelector(".login__form");

//Valida o input pegando o target do evento
const validateInput = ({ target }) => {
  if (target.value.length > 2) {
    button.removeAttribute("disabled");
    return;
  }
  button.setAttribute("disabled", "");
};

//Salva o que foi digitado no input
const handleSubmit = (event) => {
  event.preventDefault();

  localStorage.setItem("player", input.value);
  window.location = "pages/game.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
