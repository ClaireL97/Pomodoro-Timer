var minutes = 0;
var seconds = 1;

seconds = seconds < 10 ? "0" + seconds : seconds;
document.getElementById("countdown").innerHTML = `${minutes}: ${seconds}`;

function display(){
  resetSeconds();
  seconds -= 1;

  //Change single digits to double digits
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = parseInt(minutes, 10);

  if (timerIsDone()) {
    document.getElementById("countdown").innerHTML = `Time to take a break!`;
    clearInterval(timer);
    return
  };
  document.getElementById("countdown").innerHTML = `${minutes}: ${seconds}`;
}

function resetSeconds() {
  if (seconds == 0 && minutes != 0) {
    minutes -= 1;
    seconds += 60;
  }
}

function timerIsDone() {
  return seconds == "00" && minutes == 0;
}

var timer = window.setInterval(function(){ display() },1000);
