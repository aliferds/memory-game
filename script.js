var images = [];
for(var i = 0; i < 12; i++){
    var img = {
        src: "assets/" + (i%6) + ".jpg",
        id: i%6
    };
    images.push(img);
}
for(var i = 0; i < 12; i++){
    console.log(images[i].src);
}

cards();

function cards(){
    var frontFaces = document.getElementsByClassName("front");
    for(var i = 0; i < 12; i++){
        var card = document.querySelector("#card"+i);
        card.style.left = i%6 === 0 ? 25 + "px" : i%6*185+25 + "px";
        card.style.top = i < 6 ? 25 + "px" : 290 + "px";

        card.addEventListener("click", flipCard, false);
        frontFaces[i].style.background = "url("+images[i].src+");";
        frontFaces[i].style.repeat = "no-repeat";
    }
}
function flipCard(){
    var faces = this.getElementsByClassName("face");
    faces[0].classList.toggle("flipped");
    faces[1].classList.toggle("flipped");
}