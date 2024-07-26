const saveBtn = document.querySelector("#saveBtn");
const form = document.querySelector(".js-form");
const inputName = document.querySelector("#name");
const date = new Date();
const hoje = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
console.log(hoje);

inputName.addEventListener("input", () => {
  var letters = /^[A-Za-z]+$/;
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
  if (!inputName.value.match(/^[A-Za-z]+$/)) {
    inputName.value = "";
  }
});

saveBtn.addEventListener("click", () => {
  const formData = new FormData(form);
  const a = formData.get("name");
  const b = formData.get("birth-date");
  console.log("wtf", a, b);
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
