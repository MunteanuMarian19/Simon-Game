let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];


let gameStarted = false; //nothing pressed, game is not started
let level = 0; //initializing level of the game with 1

$(document).keydown(function() { //detecting a keydown

  if (!gameStarted) { //if it's true, it's started

    $("#level-title").text("Level " + level); //showing the first level, after a key was pressed
    nextSequence(); //calling the nextSequence
    gameStarted = true; //changed the boolean value, because key was pressed
  }
});


//////////////////////////////////////////////////////////////////////////////////
$(".btn").click(function() {

  let userChosenColour = $(this).attr("id"); //getting the the color's id that was clicked(red, blue, yellow or green)
  userClickedPattern.push(userChosenColour); //pushed in the userClickedPattern[userChosenColour]

  playSound(userChosenColour); //play the sound for that specific box/btn clicked

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

  console.log(userClickedPattern.length);
});

/////////////////////////////////////////checkAnswer(currentLevel)/////////////////////////////
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //checkinf if you matched with clicking the game patern made random
    console.log("success"); //just for me the message

    if (userClickedPattern.length === gamePattern.length) { // the same nr of elements in the array?
      setTimeout(function() {
        nextSequence(); //adding the 'delay' for 1 sec before calling nextSequence()
      }, 1000);
    }
  } else {

    gameOver();
    console.log("wrong number");
    startOver();
  }

}

/////////////////////////////////////////////nextSequence();//////////////////////////////////////
function nextSequence() {

  userClickedPattern = []; //resetting the userClickedPatern
  level++; //after matching the patern, increase the patern.length and level ++
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //using jQuery to select the btns acording to the same id as the randomChosenColour
  //applying the fade in and out and in, effect
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour); //playing the sound according with the randomChosenColour

}

//////////////////////////////////creating playSound() with nameColour as parameter/////////////////////////////////
function playSound(nameColour) {

  let audio = new Audio("sounds/" + nameColour + ".mp3"); //here, nameColour is the clicked colour, with the src of each sound
  audio.play(); //integreted in js the fct to play the sound

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function animatePress(currentColour) { //curentColour is actually the colour that is pressed

  $("#" + currentColour).addClass("pressed"); //adding the class 'pressed' after clicking on it, ''#'' is for making the id

  setTimeout(function() { //setTimeout has 2 param: 1'st the inner anonymous function and what to do, removing
    $("#" + currentColour).removeClass("pressed"); //2'nd: how much time to wait until it will start doing(remove it)
  }, 100);

}

///////////////////////////////////////////////gameOver()/////////////////////////////////////////////
function gameOver() {

  let audioWrong = new Audio("sounds/wrong.mp3");
  audioWrong.play();

  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over, Press Any Key to Restart!");

}

function startOver() {

  level = 0;
  gamePattern = [];
  gameStarted = false;

  //calling the startOver() if the sequence is wrong...
}
