function jsTimer(minutes, seconds) {
  updateTime();

  function display(){
    seconds--;

    if (timerIsDone()) {
      document.getElementById("countdown").innerHTML = `Time to take a break!`;
      clearInterval(timer);
      return
    };
    updateTime();
  }

  function updateTime() {
    resetSeconds();
    doubleDigitSeconds();
    minutes = parseInt(minutes, 10);
    document.getElementById("countdown").innerHTML = `${minutes}: ${seconds}`;
  }

  function doubleDigitSeconds() {
    seconds = seconds < 10 ? "0" + seconds : seconds
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
}
