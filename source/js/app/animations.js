// init wow.js
wow = new WOW({
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       120,          // default
      mobile:       false,       // default
      live:         true        // default
    })

wow.init();

if ($('#logo-svg').length) {
	new Vivus('logo-svg', {duration: 120});
}