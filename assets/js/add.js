const id = new URLSearchParams(window.location.search).get("id");

let form = document.querySelector("form");
let imgInp = document.querySelector("#file");
let name = document.querySelector("#name");
let description = document.querySelector("#description");
let prize = document.querySelector("#prize");

let url = `http://localhost:3000/data/`;

form.addEventListener("submit", (evenet) => {
  evenet.preventDefault();
  inputs = [name, prize, imgInp, description];

  if (name.value.trim() && description.value.trim()) {
    let src = imgInp.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = (e) => {
      let obj = {
        image: e.target.result,
        name: name.value,
        description: description.value,
        prize: prize.value,
      };
      axios.post(url, obj).then((res) => {
        window.location = `./index.html`;
      });
    };
  } else {
    inputs.forEach((element) => {
      let display = element.value.trim() == "" ? "block" : "none";
      element.nextElementSibling.style.display = display;
    });
  }
});

let table = document.querySelector("table");

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      table.innerHTML += `
<tr>
<th>${element.id}</th>
<th>${element.name}</th>
<th>${element.description}</th>
<th>${element.prize}</th>
<th>
<button onclick ="DeleteBtn(${element.id})">Delete</button>

</th>

<th><button onclick ="UpdateBtn(${element.id})">Update</button></th>
</tr>

`;
    });
  });

function DeleteBtn(id) {
  axios.delete(`http://localhost:3000/data/${id}`);
  window.location.reload();
}

function UpdateBtn(id) {
  window.location = `./update.html?id=${id}`;
}
