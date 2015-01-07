$(document).ready(function() {

  var questionNumber = -1,
      totalRight = 0,
      totalWrong = 0,
      totalQuestions = 0,
      questionSeries = {};
      isLocked = true;

  var WELCOME_QUESTION = "Thanks for using TIY-Flashcard!<br>Use the 'Flip (^)' button or your up arrow key to switch from question to answer.<br>Use the 'Next (&gt;)' button or your right arrow key to get started.<br>Enjoy!",
      WELCOME_ANSWER = "This is a sample answer! Click 'Next (&gt;)' or click your right arrow key to try the real thing!",
      DONE_QUESTION = "All done! Use the 'Back (&lt;)' button or your left arrow key to review, or load a new question set from above!",
      DONE_ANSWER = "No more answers here!";

  // $("#question p").html(WELCOME_QUESTION);
  // $("#answer p").html(WELCOME_ANSWER);

  var loadQuestion = function(num) {
    $("#answer").hide();
    $("#question").show();
    if (num < totalQuestions && num > -1) {
      $("#question p").text(Object.keys(questionSeries)[questionNumber]);
      $("#answer p").text(questionSeries[Object.keys(questionSeries)[questionNumber]]);
      console.log(Object.keys(questionSeries)[questionNumber]);
    } else if (num >= totalQuestions) {
      $("#question p").html(DONE_QUESTION);
      $("#answer p").html(DONE_ANSWER);
      console.log("All done!");
      questionNumber = totalQuestions;
    } else {
      $("#question p").html(WELCOME_QUESTION);
      $("#answer p").html(WELCOME_ANSWER);
      console.log("Out of bounds!");
      questionNumber = -1;
    }
  };

  var loadNextQuestion = function() {
    if (isLocked) { return; }
    questionNumber++;
    loadQuestion(questionNumber);
  };

  var loadPreviousQuestion = function() {
    if (isLocked) { return; }
    questionNumber--;
    loadQuestion(questionNumber);
  };

  var flipCard = function() {
    if (isLocked) { return; }
    $("#question").toggle();
    $("#answer").toggle();
  };

  var loadCardset = function(filename) {
    $.getJSON("flashcard-sets/" + filename, function(json) {
      questionSeries = json;
      totalQuestions = Object.keys(questionSeries).length;
      console.log(totalQuestions + " questions successfully loaded from " + filename + "!");
      initCardset();
    });
  };

  var initCardset = function() {
    $("#question p").html(WELCOME_QUESTION);
    $("#answer p").html(WELCOME_ANSWER);
    questionNumber = -1;
    isLocked = false;
  };

  $("#cardsets").on('change', function() {
    loadCardset(this.value);
  });

  $("#next").on('click', function() {
    loadNextQuestion();
  });

  $("#prev").on('click', function() {
    loadPreviousQuestion();
  });

  $("#check").on('click', function() {
    flipCard();
  });

  $(document).keydown(function(e){
    if (e.keyCode === 37) {
      loadPreviousQuestion();
    } else if (e.keyCode === 38) {
      flipCard();
    } else if (e.keyCode === 39) {
      loadNextQuestion();
    }
  });

});
