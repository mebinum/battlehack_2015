'use strict';
angular.module('WishpointApp.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Scruff McGruff'
  }, {
    id: 1,
    name: 'G.I. Joe'
  }, {
    id: 2,
    name: 'Miss Frizzle'
  }, {
    id: 3,
    name: 'Ash Ketchum'
  }];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  };
})

.factory('BlueCats', ['$rootScope',
  function($rootScope) {
    //Update with the api token for your app from https://app.bluecats.com
    var blueCatsAppToken = '14635b84-f008-42b3-9370-c1c11b41c374';
    var beaconsObjs = {};

    var app = {
      // deviceready Event Handler
      //
      // The scope of 'this' is the event. In order to call the 'receivedEvent'
      // function, we must explicity call 'app.receivedEvent(...);'
      onDeviceReady: function() {
        app.receivedEvent('received');
        app.watchBeacons();
      },
      // Update DOM on a Received Event
      receivedEvent: function(event) {
        if (event === 'apptokenrequired') {
          //broadcast
          $rootScope.$broadcast('bc_apptokenrequired', {
            msg: 'App token not set'
          });
        } else if (event === 'bluecatspurring') {
          $rootScope.$broadcast('bc_bluecatspurring', {
            msg: 'Looking for beacons'
          });
        }

        var msg = 'Received Event: ' + event;
        console.log(msg);

        $rootScope.$broadcast('bc_receivedevent', {
          event: event,
          msg: msg
        });
      },

      watchBeacons: function() {
        var watchIdForEnterBeacon, watchIdForExitBeacon, watchIdForClosestBeacon = null;

        if (blueCatsAppToken === 'BLUECATS-APP-TOKEN') {
          //BlueCats app token hasn't been configured
          app.receivedEvent('apptokenrequired');
          return;
        }

        var beaconWatchOptions = {
          filter: {
            //Configure additional filters here e.g.
            //sitesName:['BlueCats HQ', 'Another Site'],
            //categoriesNamed:['Entrance'],
            //maximumAccuracy:0.5
            //etc.
          }
        };

        var displayBeacons = function(description, watchData) {
          var beacons = watchData.filteredMicroLocation.beacons;
          var beaconNames = [];
          for (var i = 0; i < beacons.length; i++) {
            beaconNames.push(beacons[i].name);
          }

          angular.copy(beacons,beaconsObjs);

          var displayText = description + ' ' + beacons.length + ' beacons: ' + beaconNames.join(',');
          console.log(displayText);

          var logError = function() {
            console.log('Error occurred watching beacons');
            $rootScope.$broadcast('bc_error', {
              msg: 'Error occurred watching beacons'
            });
          };

          var watchBeaconEntryAndExit = function() {
            if (watchIdForEnterBeacon !== null) {
              com.bluecats.beacons.clearWatch(watchIdForEnterBeacon);
            }

            if (watchIdForExitBeacon !== null) {
              com.bluecats.beacons.clearWatch(watchIdForExitBeacon);
            }

            watchIdForEnterBeacon = com.bluecats.beacons.watchEnterBeacon(
              function(watchData) {
                $rootScope.$broadcast('bc_entered', {
                  msg: 'found new beacon'
                });
                displayBeacons('Entered', watchData);
              }, logError, beaconWatchOptions);
            watchIdForExitBeacon = com.bluecats.beacons.watchExitBeacon(
              function(watchData) {
                displayBeacons('Exited', watchData);
                $rootScope.$broadcast('bc_left', {
                  msg: 'left beacon proximity'
                });
              }, logError, beaconWatchOptions);
          };

          var watchClosestBeacon = function() {
            if (watchIdForClosestBeacon !== null) {
              com.bluecats.beacons.clearWatch(watchIdForClosestBeacon);
            }

            watchIdForClosestBeacon = com.bluecats.beacons.watchClosestBeaconChange(
              function(watchData) {
                displayBeacons('Closest to', watchData);
                $rootScope.$broadcast('bc_close', {
                  msg: 'new beacon close by'
                });
              }, logError, beaconWatchOptions);
          };

          var purringSuccess = function() {
            app.receivedEvent('bluecatspurring');
            watchBeaconEntryAndExit();
            watchClosestBeacon();
          };

          var sdkOptions = {
            trackBeaconVisits: true, //Log visits to beacons to the BlueCats api
            useLocalStorage: true, //Cache beacons in local db for offline availability
            cacheAllBeaconsForApp: true, //Cache all beacons on startup
            discoverBeaconsNearby: true, //Cache beacons as detected by the device
            cacheRefreshTimeIntervalInSeconds: 300 //Period to check for changes in second
          };

          com.bluecats.beacons.startPurringWithAppToken(blueCatsAppToken, purringSuccess, logError, sdkOptions);
        };
      },
      allBeacons: function() {
        return beaconsObjs;
      }
    };
    return app;
  }
]);