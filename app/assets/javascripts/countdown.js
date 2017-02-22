(function(intervalTime){
    var interval = null;

    function startTicks(){
        stopTicks();
        interval = setInterval(function(){
            self.postMessage(Math.floor(Date.now()));
        }, intervalTime);
    }

    function stopTicks(){
        if(interval){
          clearInterval(interval);
          interval = null;
        }
    }

    self.addEventListener('message', function(e){
        switch (e.data) {
            case 'start':
                startTicks();
                break;
            case 'stop':
                stopTicks();
                break;
        };
    }, false);

})(1000);
