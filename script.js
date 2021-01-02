var images = [];
var flippedCards = [];
for(var i = 0; i < 12; i++){
    var img = {
        src: `assets/${i%6}.jpeg`,
        id: i%6
    };
    images.push(img);
}
startGame();

function startGame(){
    flippedCards = [];
    images = randomShuffle(images);
    
    for(var i = 0; i < 12; i++){
        var card = document.querySelector("#card"+i);
        card.style.left = i%6 === 0 ? 25 + "px" : i%6*185+25 + "px";
        card.style.top = i < 6 ? 25 + "px" : 290 + "px";

        card.addEventListener("click", flipCard, false);
        var frontFace = card.querySelector(".front");
        frontFace.style.background = `url('${images[i].src}')`
    }

    var modal = document.querySelector("#gameOverModal");
    modal.style.zIndex = -2;
    modal.removeEventListener("click", startGame, false);
}
function flipCard(){
    if(flippedCards.length < 2 ){
        var faces = this.getElementsByClassName("face");
        if(faces[0].classList.length > 2){
            return;
        }
        
        faces[0].classList.toggle("flipped");
        faces[1].classList.toggle("flipped");

        flippedCards.push(this);
    }else{
        console.log(flippedCards);
        
        flippedCards[0].childNodes[1].classList.toggle("flipped");
        flippedCards[0].childNodes[3].classList.toggle("flipped");
        flippedCards[1].childNodes[1].classList.toggle("flipped");
        flippedCards[1].childNodes[3].classList.toggle("flipped");
        

        flippedCards = [];
    }
}
window.setTimeout(function(){
    gameOver()
}, 5000);

function gameOver(){
    var modal = document.querySelector("#gameOverModal");
    modal.style.zIndex = 10;
    modal.addEventListener("click", startGame, false);
}

function randomShuffle(array){
    var newArray = [];
    while(newArray.length !== array.length){
        var i = Math.floor(Math.random()*array.length);

        if(newArray.indexOf(array[i]) < 0){
            newArray.push(array[i]);
        }
    }
    return newArray;
}