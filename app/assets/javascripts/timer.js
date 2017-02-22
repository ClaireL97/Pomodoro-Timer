"use_strict";

var timer;

$(document).ready(function(){
  createNewTimer();

  $("#start-btn").on('click', function(event) {
    event.preventDefault();
    timer.interval = window.setInterval( function(){ timer.display(); }, 10);
    timer.updateTime();
    $("#start-btn").hide();
    show("reset-btn");
    show("pause-btn");
  });

  $("#pause-btn").on('click', function() {
    event.preventDefault();
    timer.isPaused = true;
    $("#pause-btn").hide();
    show("resume-btn");
  });

  $("#resume-btn").on('click', function() {
    event.preventDefault();
    timer.isPaused = false;
    show("pause-btn");
    $("#resume-btn").hide();
  });

  $("#reset-btn").on('click', function() {
    event.preventDefault();
    clearInterval(timer.interval);
    $("i").hide();
    createNewTimer();
  });
});

var jsTimer = function(minutes, seconds) {
  this.interval;
  this.centiseconds = 0;
  this.seconds = seconds;
  this.minutes = minutes;
  this.isPaused = false;
};

// jsTimer.prototype.decreaseTime = function() {
//   if (this.centiseconds < 0) {
//     this.seconds--;
//     this.centiseconds = 99;
//   }
//   if (this.seconds < 0 && this.minutes !== 0) {
//     this.minutes--;
//     this.seconds = 59;
//   }
// };

jsTimer.prototype.timerIsDone = function () {
  return this.seconds === "00" && this.minutes === "00" && this.centiseconds === 0;
};

jsTimer.prototype.updateTime = function() {
  this.decreaseTime();
  this.minutes = doubleDigitify(this.minutes);
  this.seconds = doubleDigitify(this.seconds);
  this.centiseconds = doubleDigitify(this.centiseconds);
  $("#countdown").html(this.minutes + ":" + this.seconds + "." + this.centiseconds);
};

jsTimer.prototype.display = function(){
  if (!this.isPaused) {
    this.centiseconds--;
    if (this.timerIsDone()) {
      var $countdown = $("#countdown");
      var update_path = $countdown.data('updateUrl');
      $countdown.html("Time to take a break!");
      playSound();
      clearInterval(this.interval);
      $("#pause-btn").hide();
      if(update_path){
        $.ajax({
          url: update_path,
          type: "PUT",
          data: 1,
        });
      }
      return;
    }
    this.updateTime();

  }
};

function doubleDigitify(number) {
  return number < 10 ? "0" + parseInt(number, 10) : number;
}

function createNewTimer() {
  $(".timer-btn").hide();
  show("start-btn");
  var times = {minutes: "25", seconds: "00"};
  timer = new jsTimer(times.minutes, times.seconds);
  $("#countdown").html(doubleDigitify(times.minutes) + ":" + doubleDigitify(times.seconds) + ".00");
}

function playSound() {
  var sound = document.getElementById("audio");
  sound.play();
}

function show(element) {
  $("#" + element).css("display", "");
  $("#" + element).css("visibility", "visible");
}
