"use_strict";

var timer;

$(document).ready(function(){

   var tickWorker;
   if (window.Worker){
     tickWorker = new Worker('/assets/countdown.js');
     tickWorker.postMessage('start');
     tickWorker.addEventListener('message',
       function(message){tickCallback(message.data);}
     );
   }

  createNewTimer();

  function tickCallback(timestamp){
    console.log('TICK', timestamp);

    if(timer){
      console.log("TIMER ELAPSED MS", timer.elapsedTime());
      console.log("TIMER REMAINING MS", timer.remainingTime());
      console.log("TIMER REMAINING", timer.remainingTimeHuman());
    }
  }

  $("#start-btn").on('click', function(event) {
    event.preventDefault();
    timer.interval = window.setInterval( function(){ timer.display(); }, 10);
    timer.resume();
    timer.updateTime();
    $("#start-btn").hide();
    show("reset-btn");
    show("pause-btn");
  });

  $("#pause-btn").on('click', function() {
    event.preventDefault();
    timer.pause();
    $("#pause-btn").hide();
    show("resume-btn");
  });

  $("#resume-btn").on('click', function() {
    event.preventDefault();
    timer.resume();
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
  // this.centiseconds = 0;
  this.seconds = seconds;
  this.minutes = minutes;
  this.isPaused = true;
  this.startTimestamp = Math.floor(Date.now());
  this.elapsedPause = 0;
  this.currentPauseStart = this.startTimestamp;
  this.duration = (parseInt(minutes,10) * 60000) + (parseInt(seconds,10) * 1000);
  console.log(this)
};

jsTimer.prototype.elapsedTime = function() {
   var now = Math.floor(Date.now());

   var adjustPause = this.elapsedPause;

   if(this.isPaused){
     adjustPause += ( Math.floor(Date.now()) - this.currentPauseStart )
   }

   return (now - this.startTimestamp) - adjustPause;
}

jsTimer.prototype.remainingTime = function() {
  return this.duration - this.elapsedTime();
}

jsTimer.prototype.remainingTimeHuman = function() {
  var millis = this.remainingTime()
  return {
    minutes : Math.floor(millis / 60000),
    seconds : Math.floor((millis % 60000) / 1000)
  }
}

jsTimer.prototype.pause = function() {
  this.isPaused = true;
  this.currentPauseStart = Math.floor(Date.now());
}

jsTimer.prototype.resume = function() {
  this.isPaused = false;
  this.elapsedPause += ( Math.floor(Date.now()) - this.currentPauseStart );
  this.currentPauseStart = 0;
}


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
  return this.remainingTimeHuman().seconds == "0" && this.remainingTimeHuman().minutes == "0";
};

jsTimer.prototype.updateTime = function() {
  this.minutes = doubleDigitify(this.remainingTimeHuman().minutes);
  this.seconds = doubleDigitify(this.remainingTimeHuman().seconds);
  $("#countdown").html(this.minutes + ":" + this.seconds);
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
  var times = {minutes: "0", seconds: "05"};
  timer = new jsTimer(times.minutes, times.seconds);
  $("#countdown").html(doubleDigitify(times.minutes) + ":" + doubleDigitify(times.seconds));
}

function playSound() {
  var sound = document.getElementById("audio");
  sound.play();
}

function show(element) {
  $("#" + element).css("display", "");
  $("#" + element).css("visibility", "visible");
}
