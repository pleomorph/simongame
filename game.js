var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var inGame = false;
var level = 0;
var i=0;
var oneColorAtATime = 0;
var slowItDown = 0;
var score = 0;

// Listen for clicks
$(".btn").click(function() {

  // Find the color that was clicked
  var userChosenColor = $(this).attr("id");

  // Store the pattern that the user is clicking
  userClickedPattern.push(userChosenColor);

  // Play that color's sound
  playSound(userChosenColor);

  // Animate the color
  animatePress(userChosenColor);

  // Check answer
  checkAnswer(userClickedPattern.length - 1);
});

// Listen for keyboard presses
$(document).keypress(function(){
  if (inGame === false){
    $("#level-title").text("Level " + level);
    $("#smaller-title").text("Score " + level);
    nextSequence();

    // We've started a game
    inGame = true;
  }

});

function nextSequence() {

  // Increase the level and show it
  level++;
  $("#level-title").text("Level " + level);

  // Clear out the user input
  userClickedPattern = [];

   // Number between 0-3
   var randomNumber = Math.floor(Math.random()*4);

   // Pick a color from the array
   var randomChosenColor = buttonColors[randomNumber];

   // Store the color in the game's array
   gamePattern.push(randomChosenColor);
   console.log(gamePattern);

   // Animate the color
   //$("#" + randomChosenColor).fadeOut(100).fadeIn(100);



   // Loop through the current Game Sequence
   var i = 0;
   var moves = setInterval(function(){
      animateAndPlaySound(gamePattern[i]);
      i++;
      if (i >= gamePattern.length) {
        clearInterval(moves);
      }
   }, 600)
   
}

function animateAndPlaySound(oneColorAtATime){
    
    //Animate this color
    $("#" + oneColorAtATime).fadeOut(100).fadeIn(100);

    // Play this color's sound
    playSound(oneColorAtATime);

}

function playSound(colorName) {

  // Find that color's MP3 file
  var colorSound = new Audio("sounds/" + colorName + ".mp3");

  // Play it
  colorSound.play();
}

function animatePress(currentColor) {

  // Add the "pressed" class
  $("#" + currentColor).addClass("pressed");

  // Wait 100ms, then remove the "pressed" class
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Correct");
    score = score + 10;
    $("#smaller-title").text("Score " + score);

    // Was that the entire sequence up to this point?
    if (userClickedPattern.length === gamePattern.length) {

      // If so, move on to the next Level
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    // GAME OVER SEQUENCE

    console.log("Incorrect");

    // Play the wrong.mp3
    playSound("wrong");

    // Add the "game-over" class
    $("body").addClass("game-over");

    // Wait 200ms, then remove the "game-over" class
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Change the H1
    $("#level-title").text("Game Over!")

    // Reset
    startOver();

  }

}

function startOver() {
  level = 0;
  score = 0;
  gamePattern = [];
  inGame = false;
}