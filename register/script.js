const saveBtn = document.querySelector("#saveBtn");
const form = document.querySelector(".js-form");
const inputName = document.querySelector("#name");

const date = new Date();
const hoje = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
console.log(hoje);

let peoplesArr;

if (localStorage.getItem("peoples")) {
  try {
    peoplesArr = JSON.parse(localStorage.getItem("peoples"));
  } catch (e) {
    console.error("Erro ao analisar JSON do localStorage:", e);
    peoplesArr = [];
  }
}

class People {
  constructor(name, birthDate) {
    this.name = name;
    this.birthDate = birthDate;
  }
}

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

saveBtn.addEventListener("click", (event) => {
  const formData = new FormData(form);
  const name = formData.get("name");
  const birthDate = formData.get("birth-date");

  peoplesArr.push(new People(name, birthDate));
  localStorage.setItem("peoples", JSON.stringify(peoplesArr));
});

console.log(localStorage.getItem("peoples"));

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
