$(document).ready(function(){
  if (window.Worker){
   var worker = new Worker('./timer.js');
  }

  worker.onmessage = function(event){}

})
