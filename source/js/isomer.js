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
var iso = new Isomer(canvas);
var Shape = Isomer.Shape;
var Point = Isomer.Point;
var Color = Isomer.Color;
var blocks = [];
var translate = 0;
var bg = new Color(95, 209, 192);

function randomSize() {
	return {
		w: randomInt(1,4),
		l: randomInt(1,4),
		h: randomInt(1,3)
	};
}

var i = 0;
var blockMaker = interval(function() {
	var point = Point(randomInt(1,4), randomInt(1,4), randomInt(1,4));
	var size = randomSize();
	while (size.w * size.l * size.h > 16) size = randomSize();
	var block = Shape.Prism(point, size.w, size.l, size.h);
	blocks[i = ++i % 6] = {
		block: block,
		yPos: 5
	};
}, 500);
blockMaker.start();

var animator = interval(function() {
	// Stupid bg to lay over old blocks:
	iso.add(Shape.Prism(new Point(-8, 0, -8), 16, 8, 24), bg);
	
	iso.add(blocks.map(function(block) {
		block.yPos -= 0.24;
		return block.block.translate(0, 0, block.yPos);
	}));
}, 1000 / 50);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

animator.start();