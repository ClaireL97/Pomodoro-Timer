var timer;

$(document).ready(function(){
  createNewTimer();
});

$("#start-btn").on('click', function() {
  timer.interval = window.setInterval( function(){ timer.display(); }, 10);
  timer.updateTime();
  $("#start-btn").hide();
  $("#reset-btn").show();
  $("#pause-btn").show();
});

$("#pause-btn").on('click', function() {
  timer.isPaused = true;
  $("#pause-btn").hide();
  $("#resume-btn").show();
});

$("#resume-btn").on('click', function() {
  timer.isPaused = false;
  $("#pause-btn").show();
  $("#resume-btn").hide();
});

$("#reset-btn").on('click', function() {
  clearInterval(timer.interval);
  $("input").hide();
  createNewTimer();
});

var jsTimer = function(minutes, seconds) {
  this.interval;
  this.centiseconds = 0;
  this.seconds = seconds;
  this.minutes = minutes;
  this.isPaused = false;
};

jsTimer.prototype.resetSeconds = function() {
  if (this.centiseconds < 0) {
    this.seconds--;
    this.centiseconds = 99;
  }
  if (this.seconds < 0 && this.minutes !== 0) {
    this.minutes--;
    this.seconds = 59;
  }
};

jsTimer.prototype.timerIsDone = function () {
  return this.seconds === 0 && this.minutes === 0;
};

jsTimer.prototype.updateTime = function() {
  this.resetSeconds();
  this.minutes = doubleDigitify(this.minutes);
  this.seconds = doubleDigitify(this.seconds);
  this.centiseconds = doubleDigitify(this.centiseconds);
  document.getElementById("countdown").innerHTML = `${this.minutes}:${this.seconds}.${this.centiseconds}`;
};

jsTimer.prototype.display = function(){
  if (!this.isPaused) {
    this.centiseconds--;
    if (this.timerIsDone()) {
      document.getElementById("countdown").innerHTML = `Time to take a break!`;
      clearInterval(this.interval);
      return;
    }
    this.updateTime();
  }
};

function doubleDigitify(number) {
  return number < 10 ? "0" + parseInt(number, 10) : number;
};

function createNewTimer() {
  timer = new jsTimer(25, 0);
  document.getElementById("countdown").innerHTML = `25:00.00`;
  $("#start-btn").show();
}