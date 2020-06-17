var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level = 0;
var started = false;
$(document).on('keypress click touch'function() {
      if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

      }
    });

    function checkAnswer(currentLevel){
      if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 2000);
}

      }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 300);

        startOver();
      }
      }


    function nextSequence() {
       userClickedPattern = [];
      level++;
      $("h1").text("Level " + level);

      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
      animatePress(randomChosenColour);
      playSound(randomChosenColour);

    }



    // $("button").click(function(){
    //   console.console.log($("button").id());
    // })
    $(".btn").on('click', function() {
      var userChosenColour = $(this).attr('id');
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);

      checkAnswer(userClickedPattern.length-1);
    })

    function animatePress(currentColour) {
      $("#" + currentColour).fadeOut(100).fadeIn(100).addClass('pressed');
      setTimeout(function() {
        $("#" + currentColour).removeClass('pressed');
      }, 50);
    }

    function playSound(name) {
      var audio = new Audio("sounds/meme/" + name + ".mp3");
      audio.play();
    }

    function startOver() {
      level = 0;
      gamePattern = [];
      started = false;
    }
