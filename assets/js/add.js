let form= document.querySelector("form");
let name = document.querySelector('#name');
let description = document.querySelector('#description');
let price = document.querySelector('#price');
let  roundedImg = document.querySelector(".rounded-image");
let file = document.querySelector('.photo');
let table = document.querySelector('table')




fetch('http://localhost:3000/data')
.then(response => response.json())
.then(data => {
 data.forEach((element) => {
  table.innerHTML += `
  
  <tr>
  <th>${element.id}</th>
  <th>${element.name}</th>
  <th>${element.description}</th>
  <th>
  <button onclick="deleteBtn(${element.id})">Delete</button>
  </th>
</tr>
  
  
  `
 });
})

let deleteBtn = (id) => {
  axios.delete('http://localhost:3000/data/'+ id)
  .then(res => 
    window.location.reload()
  
    )

}


file.addEventListener("input", (e) =>{
let file = e.target.files[0]
if(file){
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    roundedImg.src = reader.result;
  }
}
})



form.addEventListener("submit" , (event) => {
event.preventDefault();
const inputs = [ name,description,pcize,file];
if(name.value.trim() && description.value.trim() && price.value.trim() && file.src.trim()){
let obj = {
              name: name.value,
              description: description.value,
              prize: price.value,
              image : file.src
          }

          axios.post('http://localhost:3000/data' , obj)
          .then(res => {
            window.location = "./index.html"
          })
      

    }else{
inputs.forEach( input  => {
  if(input.value.trim() == ""){
    input.previousElementSibling.style.display = 'block'
  }
  else{
    input.previousElementSibling.style.display = 'none'
  }
})
    }})
  