let images=document.querySelectorAll(".gallery img");

let current=0;

function openLightbox(src){

document.getElementById("lightbox").style.display="flex";

document.getElementById("lightbox-img").src=src;

current=[...images].findIndex(img=>img.src===src);

}

function closeLightbox(){

document.getElementById("lightbox").style.display="none";

}

function changeImage(step){

current+=step;

if(current<0)

current=images.length-1;

if(current>=images.length)

current=0;

document.getElementById("lightbox-img").src=images[current].src;

}

function filterSelection(category){

let items=document.querySelectorAll(".image");

items.forEach(item=>{

if(category==="all")

item.style.display="block";

else if(item.classList.contains(category))

item.style.display="block";

else

item.style.display="none";

});

let btn=document.querySelectorAll(".buttons button");

btn.forEach(b=>b.classList.remove("active"));

event.target.classList.add("active");

}

     
