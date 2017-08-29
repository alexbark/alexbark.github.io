(function(win, doc, summer, undefined) {

  var ps = summer.pubsub,
    slides = summer.generateSlides(),
    shouldStartShow = false,
    Maybe = summer.Maybe,
    handleSlides = summer.handleSlides,
    audio = doc.querySelector(".audio"),
    initialTextConfig = {
      velocity:30,
      fontSize:80,
      startPos:0,
      clearCanvas:1,
      firstLaunch:1,
      callback: null
    };

  audio.volume = 0.5;
  //init writing text
  writeText( "How I spent money", initialTextConfig);


  //config { velocity, fontSize, startPos, clearCanvas, firstLaunch, callback}
  function writeText(text, config) {

    var canvas = doc.querySelector("canvas"),
      ctx = canvas.getContext("2d"), // get 2D context
      dashLen = 300, // dash-length for off-range
      dashOffset = dashLen, // we'll update this, initialize
      speed = config.velocity, // some arbitrary speed
      txt = text, // the text we will draw
      x = config.startPos, // start position for x
      i = 0; //iterator

    if (config.clearCanvas) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    ctx.font = config.fontSize + "px Just Me Again Down Here, sans-serif";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";

    ctx.strokeStyle = ctx.fillStyle = "#333";

    (function loop() { //self-invoked loop
      ctx.clearRect(x, 0, 60, 150); // clear canvas for each frame
      ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // calculate and set current line-dash for this char
      dashOffset -= speed; // reduce length of off-dash
      ctx.strokeText(txt[i], x, 90); // draw char to canvas with current dash-length

      if (dashOffset > 0) {
        requestAnimationFrame(loop);
      } else {
        ctx.fillText(txt[i], x, 90); // ok, outline done, lets fill its interior before next
        dashOffset = dashLen; // reset line-dash length
        // get x position to next char by measuring what we have drawn
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth;
        // if we still have chars left, loop animation again for this char
        if (i < txt.length) {
          requestAnimationFrame(loop);
        } else {
          ps.emit("getSlide", {});
          if (config.firstLaunch) {
            setTimeout(() => {
              removeLastWord(ctx, x);
            }, 1500)
          }
          if (config.callback) {
            config.callback();
          }
        }
      }
    })();
  }

  function removeLastWord(context, xPos) {
    var lastWordPos = xPos - 140,
        textConfig = {
          velocity:30,
          fontSize:80,
          startPos:lastWordPos,
          clearCanvas:0,
          firstLaunch:0,
          callback: moveCanvasToBottom
        }
    context.clearRect(lastWordPos, 0, 200, 200);
    writeText("summer", textConfig );
  }

  function moveCanvasToBottom() {
    doc.querySelector("canvas").className += " to-bottom animate";
    doc.querySelector(".img-container").style.display = "block";
    shouldStartShow = true;
    ps.emit("getSlide", {});

  }

  function showSlide(slide){
      var textConfig = {
        velocity:50,
        fontSize:50,
        startPos:0,
        clearCanvas:1,
        firstLaunch:0,
        callback: null
      }
      writeText( slide.value.text, textConfig);
      handleSlides(slide);
  }

  ps.on("getSlide", (obj) => {

    Maybe.of(doc.querySelector("img")).map((img) => {
       img.className += " fade";
    })

    var delay = 4000;
    if(shouldStartShow){
      var startSlides = setTimeout(() => {
        var slide = slides.next();
        return !slide.done ?  showSlide(slide) : ( clearInterval(startSlides),
                                                  ps.emit("slidesEnd"),
                                                  fadeAudio(),
                                                  showTitles()
                                                  )
      }, delay)
    }
  })

  ps.on("slidesEnd", (obj) => {
    Maybe.of(doc.querySelector(".overlay")).map((overlay) => {
       overlay.className += " show";
    })
  })

 function fadeAudio(){
    var stopFading = setInterval(() => {
      audio.volume = audio.volume.toFixed(2) - 0.01;
      if(audio.volume <= 0){
        clearInterval(stopFading);
        audio.pause();
      }
    },400)
  }

  function showTitles(){
     var stopTitles = setTimeout(() => {
       doc.querySelector(".theend").className += " titles"
     }, 2000)
  }


})(window, window.document, SUMMER)
