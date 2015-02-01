'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('WishpointApp', ['ionic', 'ngCordova', 'uiGmapgoogle-maps', 'config', 'WishpointApp.controllers', 'WishpointApp.services'])

.run(function($ionicPlatform, $rootScope, BlueCats,$window,$location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    BlueCats.onDeviceReady();

  });

   $rootScope.$on('$routeChangeSuccess', function() {
      if ($location.path('') === '/donate') {
        $window.alert('You hit donate');
        console.log('donate page');
        braintree.setup(
          'MIIBCgKCAQEAwpN88KQ3BvlFkLl/8X/C+fazfAoPWFdHrPdLrOix7fr8EaWeYw8b7Pf48KEweQdxBa28eLYCR+Lp28q8OS9N1cDjkVwx22IJ2lP5wkqqUvIgyCytJMfr6XKOolaToZoQGxglB6aSLgG9WbdsfqhQeXg8FropQwJn15ix3wlrRpqa3ofLfspVU6Pt/qBuMn7+Kqu/QQurQrB+SXf0HVBUpvn4JB5THg/sT0Ix/GjcK5N2np0fiD5QLLCARV17TrwC8ykK9p5ve++hKTl9XDx9SsRfSC6lAPOpb7reEJghv5aOjbg3pprTuPiePHnbgtltxSEfE7yv2JoezoEnKvP2zwIDAQAB',
          'dropin', {
            container: 'dropin'
          });
      }
    });


})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  //$stateProvider;

  // setup an abstract state for the tabs directive
  $stateProvider.state('map', {
    url: '/map',
    controller: 'MapCtrl',
    //abstract: true,
    templateUrl: 'templates/map.html'
  });

  $stateProvider.state('splash', {
    url: '/splash',
    //abstract: true,
    templateUrl: 'templates/splash.html'
  });

  $stateProvider.state('well', {
    url: '/well/:wellId',
    controller: 'WellCtrl',
    templateUrl: 'templates/well.html'
  });

  $stateProvider.state('donate', {
    url: '/donate/:wellId',
    controller: 'DonateCtrl',
    templateUrl: 'templates/donate.html'
  });

  $stateProvider.state('make-wish', {
    url: '/make-wish/:wellId',
    controller: 'WishingCtrl',
    templateUrl: 'templates/make-wish.html'
  });

  $stateProvider.state('feed', {
    url: '/feed/:wellId',
    controller: 'FeedCtrl',
    templateUrl: 'templates/feed.html'
  });

  // $stateProvider.state('checkout', {
  //   url: '/checkout',
  //   //abstract: true,
  //   templateUrl: 'http://www.wishpoint.org/server/classes/donate/donate.php'
  // });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/map');

});