// init wow.js
wow = new WOW({
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       200,          // default
      mobile:       false,       // default
      live:         true        // default
    })

wow.init();

// vivus svg animations
var servicesVivus = new Vivus('devices-svg', {duration: 120});
var teamVivus = new Vivus('team-svg', {duration: 120});
