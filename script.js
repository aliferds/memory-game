var images = [];
var flippedCards = [];
var matches = 0;
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
    matches = 0;
    images = randomShuffle(images);
    var backFaces = document.querySelectorAll(".back");
    var frontFaces = document.querySelectorAll(".front");
    
    for(var i = 0; i < 12; i++){
        backFaces[i].classList.remove("match", "flipped");
        frontFaces[i].classList.remove("match", "flipped");
        var card = document.querySelector("#card"+i);
        card.style.left = i%6 === 0 ? 25 + "px" : i%6*185+25 + "px";
        card.style.top = i < 6 ? 25 + "px" : 290 + "px";

        card.addEventListener("click", flipCard, false);
        frontFaces[i].style.background = `url('${images[i].src}')`;
        frontFaces[i].setAttribute("id",images[i].id);
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
        if(flippedCards.length === 2){
            if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                
                
                flippedCards[0].childNodes[1].classList.toggle("match");
                flippedCards[0].childNodes[3].classList.toggle("match");
                flippedCards[1].childNodes[1].classList.toggle("match");
                flippedCards[1].childNodes[3].classList.toggle("match");

                matchCardSign();

                matches++;
                flippedCards = [];
                if(matches === 6){
                    gameOver();
                }
                
            }
        }
    }else{
        console.log(flippedCards);
        
        flippedCards[0].childNodes[1].classList.toggle("flipped");
        flippedCards[0].childNodes[3].classList.toggle("flipped");
        flippedCards[1].childNodes[1].classList.toggle("flipped");
        flippedCards[1].childNodes[3].classList.toggle("flipped");
        

        flippedCards = [];
    }
}

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

function matchCardSign(){
    var modal = document.querySelector("#matchModal");
    modal.style.zIndex = 15;
    setTimeout(function(){ modal.style.zIndex = -3 }, 250);
}