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
var servicesVivus = new Vivus('services-svg', {duration: 120});
var contactVivus = new Vivus('contact-svg', {duration: 120});
var teamVivus = new Vivus('team-svg', {duration: 120});


// // init controller
// var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

// // build scenes
// new ScrollMagic.Scene({triggerElement: "#feature-post"})
//         .setTween("#feature-post > .container", {y: "80%", ease: Linear.easeNone})
//         .addIndicators()
//         .addTo(controller);