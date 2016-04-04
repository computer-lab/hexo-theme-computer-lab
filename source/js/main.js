// jQuery to collapse the navbar on scroll
function collapseNavbar() {

    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

// init wow.js
wow = new WOW(
  {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       200,          // default
    mobile:       false,       // default
    live:         true        // default
  }
)
wow.init();

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

// background-color scroll
var window_height = $(document).height();
var scroll_pos = 0;
var animation_begin_pos = 0; //where you want the animation to begin
var animation_end_pos = window_height; //where you want the animation to stop
var beginning_color = new $.Color( 'rgb(250,30,100)' ); //we can set this here, but it'd probably be better to get it from the CSS; for the example we're setting it here.
var ending_color = new $.Color( 'rgb(0,197,209)' ); ;//what color we want to use in the end

$(document).scroll(function() {
    scroll_pos = $(this).scrollTop(); 
    if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ) { 
        var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );
        var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
        var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
        var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );
        var newColor = new $.Color( newRed, newGreen, newBlue );
        console.log( window_height, newColor.red(), newColor.green(), newColor.blue() );
        $('body').animate({ backgroundColor: newColor }, 0);
    } else if ( scroll_pos > animation_end_pos ) {
         $('body').animate({ backgroundColor: ending_color }, 0);
    } else if ( scroll_pos < animation_begin_pos ) {
         $('body').animate({ backgroundColor: beginning_color }, 0);
    } else { }
});
