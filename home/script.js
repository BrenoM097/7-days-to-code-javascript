const json = localStorage.getItem("peoples");
const data = JSON.parse(json);
const table = document.querySelector(".table");

function renderTable(data) {
  table.innerHTML = `<thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nome</th>
      <th scope="col">Data de Nascimento</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>`;

  data.forEach((item, id) => {
    let tr = document.createElement("tr");
    let thId = document.createElement("th");
    let thActions = document.createElement("th");
    thActions.innerHTML = `
        <a href="../update/index.html?id=${id}"><i class="fa-solid fa-pen-to-square"></i></a>
        <a href="#" onclick="deleteItem(event, ${id})"><i class="fa-solid fa-trash"></i></a>
      `;
    thId.scope = "row";
    thId.innerText = id + 1; // ID (começando de 1)

    let tdName = document.createElement("td");
    tdName.innerText = item.name;

    let tdBirthDate = document.createElement("td");
    tdBirthDate.innerText = item.birthDate;
    
    tr.appendChild(thId);
    tr.appendChild(tdName);
    tr.appendChild(tdBirthDate);
    tr.appendChild(thActions);

    table.appendChild(tr);
  });
}

renderTable(data);

function deleteItem(event, itemId) {
  event.preventDefault();
  let newData = JSON.parse(localStorage.getItem('peoples')) ?? [];
  newData = newData.filter(function(value, index){
    return index != itemId;
  });
  localStorage.setItem('peoples', JSON.stringify(newData));
  renderTable(newData);
}


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
