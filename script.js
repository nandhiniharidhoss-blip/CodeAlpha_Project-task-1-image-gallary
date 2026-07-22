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
  const images = document.querySelectorAll(".gallery .card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;

// Open image
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        lightbox.style.display = "flex";
        lightboxImg.src = images[currentIndex].src;
    });
});

// Previous
document.querySelector(".prev").addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    lightboxImg.src = images[currentIndex].src;
});

// Next
document.querySelector(".next").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    lightboxImg.src = images[currentIndex].src;
});

// Cancel / Close
document.querySelector(".close").addEventListener("click", () => {
    lightbox.style.display = "none";
});

});

}
