console.clear();

// Generate random integer within range:
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var canvas = document.getElementById('art');
canvas.width = $(".canvas-container").width();
canvas.height = $(".canvas-container").height();
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
var start = 1;  // so that blocks start immediately

// initialize blocks filling the whole page
while(i < 20){
  var point = Point(randomInt(0,15), randomInt(0,15), randomInt(-16, -1));
  var size = randomSize();
  while (size.w * size.l * size.h > 16) size = randomSize();
  var block = Shape.Prism(point, size.w, size.l, size.h);
  blocks[i = ++i % 40] = {
    block: block,
    yPos: 0
  };
}

function step(timestamp){
  if(!start) start = timestamp;
  var progress = timestamp - start;
  if(progress > 1000){
    start = null;
    var point = Point(randomInt(0,15), randomInt(0,15), 0);
    var size = randomSize();
    while (size.w * size.l * size.h > 16) size = randomSize();
    var block = Shape.Prism(point, size.w, size.l, size.h);
    blocks[i = ++i % 40] = {
      block: block,
      yPos: 0
    };
  }
  // add background over old blocks
  iso.add(Shape.Prism(new Point(0, 0, -24), 36, 36, 1), white);

  iso.add(blocks.map(function(block) {
    block.yPos -= 0.02;
    return block.block.translate(0, 0, block.yPos);
  }), isoColor);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

