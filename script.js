function filterGallery(category){

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

if(category==="all"){

card.style.display="block";

}

else{

if(card.classList.contains(category)){

card.style.display="block";

}

else{

card.style.display="none";

}

}

});

}

function searchImages(){

let input=document.getElementById("search").value.toLowerCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let text=card.querySelector("h3").innerText.toLowerCase();

if(text.includes(input)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

}
