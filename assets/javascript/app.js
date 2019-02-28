
var panel = $('#quiz-area');
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
  question: "What was Monicas apartment number?",
  answers: ["14", "5", "91", "20"],
  correctAnswer: "20",
  image:"assets/images/apartment20.jpg"
}, {
  question: "Where did Ross and Rachel get married on a whim?",
  answers: ["Hawaii", "Las Vegas", "New York", "Atlantic City"],
  correctAnswer: "Las Vegas",
  image:"assets/images/vegas.jpeg"
}, {
  question: "Whats the name of Joeys stuffed penguin?",
  answers: ["Hugsy", "Ben", "Pengu", "Alicia May"],
  correctAnswer: "Hugsy",
  image:"assets/images/penguin.jpg"
}, {
  question: "What was Joeys imaginary friend called?",
  answers: ["Maurice", "Sally", "Niko", "Michelle"],
  correctAnswer: "Maurice",
  image:"assets/images/joey.jpeg"
}, {
  question: "What color is the ottoman in Monicas appartment?",
  answers: ["Green", "Blue", "Red", "Pink"],
  correctAnswer: "Green",
  image:"assets/images/greenottoman.gif"
}, {
  question: "What was the original name of the show?",
  answers: ["Coffee and Friends", "Buddies", "Insomnia Cafe", "The 6 of Us"],
  correctAnswer: "Insomnia Cafe",
  image:"assets/images/friends-wallpaper.jpg"
}, {
  question: "Who of the six Friends has kissed of the other five friends?",
  answers: ["Rachel", "Ross", "Phoebe", "Monica"],
  correctAnswer: "Rachel",
  image:"assets/images/rachelkissing.png"
}, {
  question: "Who does Chandler hire as his assistant?",
  answers: ["Joey", "Gunther", "Rachel", "Phoebe"],
  correctAnswer: "Phoebe",
  image:"assets/images/phoebe.png"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
