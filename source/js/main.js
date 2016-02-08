function animateText(){

	setInterval(function(){
		
		var active = $('span.active');
		var spans = $('span');
		var random = Math.floor(Math.random() * spans.length);
		var target = spans[random];

		$(active).removeClass('active');
		$(target).addClass('active');

	}, 2000);
}
animateText();