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
