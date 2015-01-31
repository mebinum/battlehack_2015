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
      var wells = [{
        'id': '1223',
        'name': 'Southbank Footbridge',
        'description': '',
        'imageUrl': '',
        'location': {
          'lat': -37.819557,
          'lng': 144.965148
        },
        'totalRaised' : 1300.00,
        'wishCount' : 50,
        'likeCount' : 13
      }, {
        'id': '123',
        'name': 'Collins Street Wishing Wall',
        'description': '',
        'imageUrl': '',
        'location': {
          'lat': -37.815531,
          'lng': 144.966927
        },
        'totalRaised' : 1700.00,
        'wishCount' : 11,
        'likeCount' : 45
      }, {
        'id': '1323',
        'name': 'Federation Square Arena',
        'imageUrl': '',
        'description': '',
        'location': {
          'lat': -37.818358,
          'lng': 144.96876
        },
        'totalRaised' : 8900.00,
        'wishCount' : 89,
        'likeCount' : 145
      }, {
        'id': '1234',
        'name': 'SouthGate Statue',
        'imageUrl': '',
        'description': '',
        'location': {
          'lat': -37.819877,
          'lng': 144.966055
        },
        'totalRaised' : 7803.00,
        'wishCount' : 123,
        'likeCount' : 563
      }, {
        'id': '12634',
        'name': 'Queen Victoria Market',
        'description': '',
        'imageUrl': '',
        'location': {
          'lat': -37.807520,
          'lng': 144.958179
        },
        'totalRaised' : 4590.00,
        'wishCount' : 33,
        'likeCount' : 45
      }, {
        'id': '12634',
        'name': 'Fitzroy Gardens Pavillion',
        'description': '',
        'imageUrl': '',
        'location': {
          'lat': -37.813181,
          'lng': 144.981296
        },
        'totalRaised' : 8932.00,
        'wishCount' : 11,
        'likeCount' : 28
      }];
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

            angular.copy(beacons, beaconsObjs);

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
        },
        getBeacons: function() {
          return wells;
        },
        getWell: function(index) {
          return _.findWhere(wells, {
            'id': index
          });
        }
      };
      return app;
    }
  ]).service('Geolocation', ['$q', 'Data',
    function Geolocation($q, data) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      var gcoder;

      if (typeof google !== 'undefined') {
        //var gmaps = window.google.maps.Load();
        gcoder = new google.maps.Geocoder();
        //TODO:limit to Australia 
        var melbourneLatLng = new google.maps.LatLng(-37.813611, 144.963056);
        //reference: original 'research', see victoria-latlon.json
        var auVicSwLatLon = new google.maps.LatLng(-39.234713, 140.962526);
        var auVicNeLatLon = new google.maps.LatLng(-33.981125, 149.975296);
        var auVicLatLonBounds = new google.maps.LatLngBounds(auVicSwLatLon, auVicNeLatLon);

        var convertToLocation = function(loc) {
          var tlat = loc.geometry.location.lat();
          var tlon = loc.geometry.location.lng();
          //if inside victorian borders add to result
          var out = {
            address: loc.formatted_address,
            coords: {
              lat: tlat,
              lng: tlon
            }
          };
          this.push(out);
        };
      }

      //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
      //retrieved from http://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates-shows-wrong

      function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var rlat1 = toRad(lat1);
        var rlat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rlat1) * Math.cos(rlat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
      }


      // Converts numeric degrees to radians

      function toRad(Value) {
        return Value * Math.PI / 180;
      }

      var currentLocation = {};
      //https://developer.mozilla.org/en/docs/WebAPI/Using_geolocation
      //var wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
      // Public API here

      var getCurrentLocation = function() {
        var dff = $q.defer();
        var geoSuccess = function(p) {
          //{coords:{latitude:theLatitude,longitude:theLongitude},timestamp:whenTheLocationWasRetrieved}
          currentLocation.coords = {};
          currentLocation.coords.lat = p.coords.latitude;
          currentLocation.coords.lng = p.coords.longitude;
          currentLocation.timestamp = p.timestamp;
          currentLocation.found = true;
          var a = [];
          a.push(currentLocation);
          data.setCurrentLocation(a);
          return dff.resolve(a);
        };

        var geoError = function() {
          currentLocation.found = false;
          dff.reject();
          // var msg = 'We could not get your current location please turn on your geolocation service in your phone settings';
          // notification.alert(msg,'Error','OK');
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        return dff.promise;
      };
      return {
        getCurrentLocation: getCurrentLocation,
        lookForAddress: function(searchText) {
          var dff = $q.defer();
          var parseResults = function(results, status) {
            // console.log("got some results");
            // console.log(results);
            var resultLocations = [];
            if (status === google.maps.GeocoderStatus.OK) {
              angular.forEach(results, convertToLocation, resultLocations);
              // console.log(resultLocations);
              // var results = angular.copy(resultLocations);
              return dff.resolve(resultLocations);
            }

            return dff.reject(google.maps.GeocoderStatus);
          };
          //TODO: check if there is an internet connection and gcoder is null
          gcoder.geocode({
            address: searchText,
            region: 'AU',
            bounds: auVicLatLonBounds,
            location: melbourneLatLng
          }, parseResults);

          return dff.promise;
        },
        distanceBetweenPoints: function(point1, point2) {
          return calcCrow(point1.lat, point1.lng, point2.lat, point2.lng);
        },
        distanceFromCurrentLocation: function(point) {
          var loc = data.getCurrentLocation();
          var distance = function(coords) {
            return calcCrow(point.lat, point.lng, coords.lat, coords.lng);
          };
          if (_.isUndefined(loc) || _.isEmpty(loc)) {
            return getCurrentLocation().then(function(data) {
              return distance(data[0].coords);
            });
          }
          return $q.when(distance(loc[0].coords));
        }
      };
    }
  ]);