console.clear();

function timeout(callback, delay, scope, args) {
	var id,
	timer = {
		callback: callback,
		delay: delay,
		going: false,
		start: function() {
			if (timer.going) return;
			timer.going = true;
			id = setTimeout(function() {
				timer.going = false;
				timer.callback.apply(scope, args);
			}, timer.delay);
		},
		stop: function() {
			clearTimeout(id);
			timer.going = false;
		}
	};
	return timer;
}

function interval(callback, delay, scope, args) {
        callback.apply(scope, args);
	var timer = timeout(function() {
		callback.apply(scope, args);
		timer.start();
	}, delay);
	return timer;
}

// Generate random integer within range:
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var canvas = document.getElementById('art');
canvas.width = $(".canvas-container").width();
canvas.height = $(".canvas-container").height();
var iso = new Isomer(canvas);
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;
var blocks = [];
var translate = 0;
var lightBlue = new Color(161,196,208);
var white = new Color(255,255,255);

function randomSize() {
	return {
		w: randomInt(1,4),
		l: randomInt(1,4),
		h: randomInt(1,3)
	};
}

var i = 0;
var blockMaker = interval(function() {
	var point = Point(randomInt(1,4), randomInt(1,4), randomInt(3,4));
	var size = randomSize();
	while (size.w * size.l * size.h > 16) size = randomSize();
	var block = Shape.Prism(point, size.w, size.l, size.h);
	blocks[i = ++i % 20] = {
		block: block,
		yPos: 5
	};
}, 2000);
blockMaker.start();

var animator = interval(function() {
	// Stupid bg to lay over old blocks:
	iso.add(Shape.Prism(new Point(-8, 0, -8), 16, 8, 24), white);
	
	iso.add(blocks.map(function(block) {
		block.yPos -= 0.02;
		return block.block.translate(0, 0, block.yPos);
	}), lightBlue);
}, 1000 / 60);


animator.start();
