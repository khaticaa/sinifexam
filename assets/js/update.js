
let id = new URLSearchParams(window.location.search).get("id");
let form = document.querySelector('form');
let img = document.querySelector('#img');
let file = document.querySelector('#file');
let name = document.querySelector('#name');
let description = document.querySelector('#description');
let prize = document.querySelector('#prize');
let url = `http://localhost:3000/data/`;

fetch(url+id)
.then(response => response.json())
.then(data =>{
    name.value = data.name;
    description.value= data.description;
    prize.value = data.prize;
    img.src = data.image;
    console.log(data)
})

file.addEventListener("input", (e) => {
    let file = e.target.files[0];
    if(file){
        let reader = new FileReader();
        reader.URLSearchParams(file);
        reader.onload = function() {
            img.src = reader.result
        }
    }

})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    axios.put(url+id ,{
        name:name.value,
        description:description.value,
        prize:prize.value,
        image:img.src,

    })
    .then(res => {
        window.location = "./index.html"
    })

})