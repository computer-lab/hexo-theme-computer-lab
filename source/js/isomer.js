$(document).ready(function(){

  // Generate random integer within range:
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var canvas = document.getElementById('art');
  canvas.width = $(".canvas-container").width();
  canvas.height = $(window).height() + 1750;
  var iso = new Isomer(canvas, {'originY': 1 });
  var Shape = Isomer.Shape;
  var Point = Isomer.Point;
  var Color = Isomer.Color;
  var blocks = [];
  var translate = 0;
  var color = $("#art").css("color");
  var rgb = color.match(/(\d+)/g);
  var isoColor = new Color(rgb[0], rgb[1], rgb[2]);
  var white = new Color(255,255,255);

  function randomSize() {
    return {
      w: randomInt(1,3),
      l: randomInt(1,3),
      h: randomInt(1,4)
    };
  }

  var i = 0;
  var lastTimestamp;
  var start = 1;  // so that blocks start immediately

  // initialize blocks filling the whole page
  while(i < 15){
    var point = Point(randomInt(0,canvas.width < 970 ? 12 : 0), randomInt(0,12), randomInt(-25, -1));
    var size = randomSize();
    while (size.w * size.l * size.h > 16) size = randomSize();
    var block = Shape.Prism(point, size.w, size.l, size.h);
    blocks[i = ++i % 40] = {
      block: block,
      yPos: 0
    };
  }

  function step(timestamp){
    canvas.width = $(".canvas-container").width();
    canvas.height = $(window).height() + 1750;
    if(!start) start = timestamp;
    if(!lastTimestamp) lastTimestamp = timestamp;
    var delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    var progress = timestamp - start;

    if(progress > 2000){
      // add new block
      start = null;
      var point = Point(randomInt(0, canvas.width < 970 ? 12 : 0), randomInt(0,12), 0);
      var size = randomSize();
      while (size.w * size.l * size.h > 16) size = randomSize();
      var block = Shape.Prism(point, size.w, size.l, size.h);
      blocks[i = ++i % 60] = {
        block: block,
        yPos: 0
      };
    }
    // add background over old blocks
    iso.add(Shape.Prism(new Point(0, 0, -100), 120, 120, 1), white);



    iso.add(blocks.map(function(block) {
      block.yPos -= 0.001 * delta;
      return block.block.translate(0, 0, block.yPos);
    }), isoColor);
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);

});
