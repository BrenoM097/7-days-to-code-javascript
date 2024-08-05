const attBtn = document.querySelector("#attBtn");
const form = document.querySelector(".js-form");
const inputName = document.querySelector("#name");
const inputBirthDay = document.querySelector("#birthDate");

const date = new Date();
const hoje = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

const queryString = window.location.search;
const urlIdParam = new URLSearchParams(queryString);
const idParam = urlIdParam.get("id");

const peoplesArr = JSON.parse(localStorage.getItem("peoples"));
const selectedPeople = peoplesArr[idParam];
class People {
  constructor(name, birthDate) {
    this.name = name;
    this.birthDate = birthDate;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (selectedPeople != null) {
    inputName.placeholder = selectedPeople.name;
    inputBirthDay.placeholder = selectedPeople.birthDate;
  }
});

inputName.addEventListener("input", () => {
  var letters = /^[A-Za-z\s]+$/;
  if (!inputName.value.match(letters)) {
    inputName.setCustomValidity("Apenas letras por favor!");
    inputName.reportValidity();
    inputName.value = "";
    return false;
  }
  inputName.setCustomValidity("");
  return true;
});

inputName.addEventListener("blur", () => {
  if (!inputName.value.match(/^[A-Za-z\s]+$/)) {
    inputName.value = "";
  }
});

attBtn.addEventListener("click", () => {
  const formData = new FormData(form);

  const name =
    formData.get("name") == "" 
    ? selectedPeople.name 
    : formData.get("name");

  const birthDate =
    formData.get("birth-date") == ""
      ? selectedPeople.birthDate
      : formData.get("birth-date");

  selectedPeople.name = name;
  selectedPeople.birthDate = birthDate;
  localStorage.setItem("peoples", JSON.stringify(peoplesArr));
  window.location.href = "../home/index.html?";
});

function loadTemplate(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Erro ao carregar o template:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadTemplate("../templates/header.html", "header");
  loadTemplate("../templates/footer.html", "footer");
  loadTemplate("../templates/config.html", "config");
});
