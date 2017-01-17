// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// Smooth Scrolling
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 500);
      return false;
    }
  }
  });
});

// Fade Out Text
// $(window).on('scroll', function () {
//     $('p, h1, h2, h3, h4, h5, span, img').each(function (index, item) {
//       var st = $(window).scrollTop();
//       st = $(window).scrollTop() - $(this).offset().top + 130;
//       $(this).css({ 'opacity': (1 - st / 50) });
//     });
// });

var canvasId = 'gradient',
    canvas = document.getElementById(canvasId),
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    grd;

// Create gradient
grd = ctx.createLinearGradient(50.000, 0.000, 0.000, width);

// Add colors
grd.addColorStop(0.000, 'rgba(101, 45, 237, 1.000)');
grd.addColorStop(0.500, 'rgba(255, 255, 255, 1.000)');

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0, 0, width, height);