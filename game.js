var lvl = 0;
var ti = 0;

var gamePattern = [];
var userPattern = [];

function animate(color) {
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#"+color).removeClass("pressed");
    }, 200);
}

function playSound(color) {
    var aud;

    if(color == "blue") aud = new Audio('sounds/blue.mp3');
    else if(color == "green") aud = new Audio('sounds/green.mp3');
    else if(color == "red") aud = new Audio('sounds/red.mp3');
    else aud = new Audio('sounds/yellow.mp3');
    aud.play();
}

function startAgain(){
    $("h1").text("Press A Key to Start");
    lvl = 0;
    ti = 0;
    gamePattern = [];
}

function gameOver(){
    $("body").addClass('game-over');
    setTimeout(function(){
        $("body").removeClass('game-over');
    }, 200);
    var aud = new Audio('sounds/wrong.mp3');
    aud.play();
    $("h1").text("Game Over, Press Any Key to Restart");

}

function checkAnswer(clevel){
    console.log(clevel);
    if(userPattern[clevel-1] == gamePattern[clevel-1]){
        if(clevel == gamePattern.length){
            setTimeout(nextSequence, 1000);
            ti = 0;
            userPattern = [];
        }
    }
    else{
        gameOver();
        startAgain();
    }
}


function nextSequence(){
    ++lvl;
    $("h1").text("Level " + lvl);
    var randNo = Math.floor(Math.random()*4);

    var colorArr = ["blue", "green", "red", "yellow"];
    
    var cc = colorArr[randNo];
    gamePattern.push(cc);

    animate(cc);
    playSound(cc);
}

$(".btn").click(function () {
    ++ti;
    var color = this.id;
    userPattern.push(color);
    animate(color);
    playSound(color);
    checkAnswer(ti);
});


document.addEventListener("keypress", function(){
    if(!lvl) nextSequence();
});