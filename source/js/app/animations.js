// init wow.js
wow = new WOW({
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       200,          // default
      mobile:       false,       // default
      live:         true        // default
    })

wow.init();

if ($('#devices-svg').length) {
  new Vivus('devices-svg', {duration: 120});
}

if ($('#team-svg').length) {
  new Vivus('team-svg', {duration: 120});
}
