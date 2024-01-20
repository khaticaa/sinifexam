let Crud = document.querySelector('.crud-o');
let search = document.querySelector('#search');
let sort  = document.querySelector('select');
let filteredArr =[];
let CopyArr =[];


async function GetAllCards() {
    let res = await axios ("http://localhost:3000/data") ;
      let data = await res.data;
    Crud.innerHTML ='';
    filteredArr = filteredArr.length || search.value ? filteredArr : data ;
   filteredArr.forEach((element) => {
    Crud.innerHTML += `
    
    <div class="bot">
    <div class="img">
        <img src="${element.image}" alt="">
    </div>
    <div class="text">
        <h4> ${element.name}</h4>
            <p>${element.description}</p>
    </div>
    <div class="price">
        <h1>${element.prize}</h1>
    </div>
</div> 
    <div class ="search">
    
    </div>
    
    `
    
   });
    
}

GetAllCards()