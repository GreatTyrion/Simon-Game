var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#level-title").html("Level " + (level += 1));

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  soundPath = randomChosenColour + ".mp3";
  playSound(soundPath);
}

function playSound(soundPath) {
  var buttonSound = new Audio(soundPath);
  buttonSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function gameOver() {
  $("#level-title").html("Game Over, Press Any Key to Restart");
  playSound("wrong.mp3");

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  userClickedPattern = [];
  gamePattern = [];

  rightStep = 0;
  enterPressKey = "False";
  level = 0;
}

var rightStep = 0;
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  soundPath = userChosenColour + ".mp3";
  playSound(soundPath);
  animatePress(userChosenColour);
  if (userChosenColour !== gamePattern[rightStep++]) {
    gameOver();
  }

  if (rightStep === level && enterPressKey === "True") {
    rightStep = 0;
    userClickedPattern = [];
    setTimeout(function () {
      nextSequence();}, 1000);
  }
});

var enterPressKey = "False";
var level = 0;

$(document).keypress(function() {
  if (enterPressKey === "False") {
    nextSequence();
    enterPressKey = "True";
  }
});
