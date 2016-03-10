/*
 * spa.shell.js
 * Danilo Zekovic
 * Main shell, basic structure of the app
*/

spa.shell = (function () {
  'use strict';
  // ------------> "Local" variables
  var
    configMap = {
      main_html : String()
      + '<div class="header">'
      +   '<div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">'
      +     '<a class="pure-menu-heading" href="">PRODUCT-NAME</a>'
      +     '<ul class="pure-menu-list">'
      +       '<li class="pure-menu-item pure-menu-selected"><a href="#" class="pure-menu-link">Home</a></li>'
      +       '<li class="pure-menu-item"><a href="#" class="pure-menu-link">Upload</a></li>'
      +       '<li class="pure-menu-item"><a href="#" class="pure-menu-link">Browse</a></li>'
      +       '<li class="pure-menu-item"><a href="#" class="pure-menu-link">Account</a></li>'
      +       '<li class="pure-menu-item"><a href="#" class="pure-menu-link">Sign Up</a></li>'
      +     '</ul>'
      +   '</div>'
      + '</div>'

      + '<div class="splash-container">'
      +   '<div class="splash">'
      +     '<h1 class="splash-head">Welcome to PRODUCT-NAME!</h1>'
      +   '</div>'
      + '</div>'

      + '<div class="content-wrapper">'
      +   '<div id="main" class="content">'
      +     '<h2 class="content-head is-center">Excepteur sint occaecat cupidatat.</h2>'
      +     '<div class="pure-g">'
      +     '</div>'
      +   '</div>'

      +   '<div class="ribbon l-box-lrg pure-g">'
      +     '<div class="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">'
      +       '<a target="_blank" class="pure-img-responsive" href="http://knuckle.palaver.net:3001/iroq.html">'
      +         '<img alt="File Icons" width="300" src="../css/img/iroquois-web.png">'
      +       '</a>'
      +  '</div>'
      +     '<div class="pure-u-1 pure-u-md-1-2 pure-u-lg-3-5">'
      +       '<h2 class="content-head content-head-ribbon">Discover deep image zooming</h2>'
      +       '<p>'
      +         'Click on the image here to see it in our pan-and-zoom interface.'
      +         'High-resolution scanned images reveal many historical details that aid'
      +         'historians in finding clues and correlations.  Take screenshots of close-up'
      +         'details and discover the magic of PRODUCT-NAME'
      +       '</p>'
      +     '</div>'
      +   '</div>'

      + '<div class="content">'
      +   '<h2 class="content-head is-center">Dolore magna aliqua. Uis aute irure.</h2>'
      +   '<div class="pure-g">'
      +     '<div class="l-box-lrg pure-u-1 pure-u-md-2-5">'
      +       '<form class="pure-form pure-form-stacked">'
      +         '<fieldset>'

      +           '<label for="name">Your Name</label>'
      +           '<input id="name" type="text" placeholder="Your Name">'

      +           '<label for="email">Your Email</label>'
      +           '<input id="email" type="email" placeholder="Your Email">'

      +           '<label for="password">Your Password</label>'
      +           '<input id="password" type="password" placeholder="Your Password">'

      +           '<button type="submit" class="pure-button">Sign Up</button>'
      +         '</fieldset>'
      +       '</form>'
      +     '</div>'

      +     '<div class="l-box-lrg pure-u-1 pure-u-md-3-5">'
      +       '<h4>Contact Us</h4>'
      +       '<p>'
      +         'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'
      +         'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'
      +         'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'
      +         'consequat.'
      +       '</p>'

      +       '<h4>More Information</h4>'
      +       '<p>'
      +         'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'
      +         'tempor incididunt ut labore et dolore magna aliqua.'
      +       '</p>'
      +     '</div>'
      +   '</div>'

      + '</div>'

      + '<div class="footer l-box is-center">'
      +   'View the source of this layout to learn more. Made with love by the YUI Team.'
      + '</div>'

      + '</div>'

    },

    stateMap = {
      // View state information
      $container  : undefined,
    },

    jqueryMap = {},

    initModule, setJqueryMap,
    currentMod;

  //--- end variables


  //--- Methods interacting with the DOM/jQuery

  // Begin DOM method /setJqueryMap
  setJqueryMap = function () {
    var $container = stateMap.$container;

    // Only three regions for now
    jqueryMap = {
      $container : $container,
      $main      : $container.find('#main')
    };
  };
  // End DOM method /setJqueryMap

  // Begin client-side router methods

  // Base route
  function index() {
    if( currentMod != jqueryMap.$main ) {
      currentMod.hide();
    }
    //currentMod.hide();
    currentMod = jqueryMap.$main;
    currentMod.show();
    //jqueryMap.$main.show();
  }

  // End DOM client-side router methods

  // -- end DOM-oriented methods //

  // -- Public API methods

  // Begin Public method /initModule
  initModule = function ( $container ) {
    // load HTML and map jQuery collections
    stateMap.$container = $container;
    $container.html( configMap.main_html );

    // Keep track of our elements
    setJqueryMap();


    spa.home.initModule(jqueryMap.$main);
    jqueryMap.$main.hide();

    // Default content is "home" screen
    currentMod = jqueryMap.$main;

    // Set up routes
    page('/', index);
    page();



  }; // End public method initModule

  // Post API reference property
  return { initModule : initModule };
  //--- end methods exposed to public
}());
