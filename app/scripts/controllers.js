'use strict';
angular.module('WishpointApp.controllers', [])

.controller('MapCtrl', ['$scope', 'BlueCats',
	function($scope, BlueCats) {
		var icons = {
			defaultIcon: {
				url: '/images/marker.png',
				scaledSize: new google.maps.Size(25, 30)
			}
		};
		var markerDetails = function() {
			var latlngbounds = new google.maps.LatLngBounds();
			var latTotal = 0;
			var lngTotal = 0;

			var markersObjs = _.map($scope.wells, function(val, key) {
				var latLng = new google.maps.LatLng(parseFloat(val.location.lat), parseFloat(val.location.lng));
				latlngbounds.extend(latLng);
				var marker = {
					'id': key,
					'selected': false,
					'showWindow': false,
					'name': val.name,
					'labelContent': val.name,
					'title': val.name,
					'icon': icons.defaultIcon,
					'coords': {
						'latitude': latLng.lat(),
						'longitude': latLng.lng()
					},
					'options': {
						disableAutoPan: true,
						pixelOffset: new google.maps.Size(0, -20)
					}
				};
				latTotal += latLng.lat();
				lngTotal += latLng.lng();
				return marker;
			});
			return {
				markers: markersObjs,
				mapBounds: latlngbounds,
				latTotal: latTotal,
				lngTotal: lngTotal
			};
		};

		$scope.init = function() {
			$scope.wells = [];
			var initMap = function() {
				$scope.map = {};
				$scope.map.control = {};
				$scope.map.events = [];
				$scope.map.center = {
					'latitude': -33.4543,
					'longitude': 150.343
				};
				$scope.map.zoom = 8;
				$scope.map.markers = [];
				$scope.map.clickedMarker = {
					title: '',
					coords: {
						'latitude': -33.4543,
						'longitude': 150.343
					},
					options: {
						disableAutoPan: true,
						pixelOffset: new google.maps.Size(0, -20)
					},
					show: false,
					hide: function() {
						this.show = false;
						return;
					}
				};
			};
			var initBeacons = function() {
				$scope.wells = BlueCats.getBeacons();
				var allPoints = markerDetails();
				$scope.map.markers = allPoints.markers;
				var length = $scope.map.markers.length;
				$scope.map.center = {
					'latitude': allPoints.latTotal / length,
					'longitude': allPoints.lngTotal / length
				};
				//console.log(JSON.stringify($scope.map.control));
				//$scope.map.control.getGMap().fitBounds(allPoints.mapBounds);
				//$scope.map.control.refresh();
			};
			initMap();
			initBeacons();
		};

		//$scope.wells = BlueCats.allBeacons();
		$scope.$on('bc_receivedevent', function(event, data) {
			console.log(data);
			$scope.eventReceived = data.msg;
		}, true);
	}
])
.controller('WellCtrl', function($scope, $stateParams, BlueCats) {
	$scope.init = function() {
		$scope.well = BlueCats.getWell($stateParams.wellId);
		$scope.map = {};
		$scope.map.control = {};
		$scope.map.center = {
			'latitude': $scope.well.location.lat,
			'longitude': $scope.well.location.lng
		};
		$scope.map.zoom = 12;
		$scope.map.markers = [];
		var marker = {
			id : $stateParams.wellId,
			'coords': {
				'latitude': $scope.well.location.lat,
				'longitude': $scope.well.location.lng
			},
			'icon':{
				url: 'images/marker.png',
				scaledSize: new google.maps.Size(25, 30)
			}
		};
		$scope.map.markers.push(marker);
	};
})
.controller('DonateCtrl', function($scope, $stateParams, BlueCats) {
	$scope.init = function() {
		$scope.well = BlueCats.getWell($stateParams.wellId);
		$scope.map = {};
		$scope.map.control = {};
		$scope.map.center = {
			'latitude': $scope.well.location.lat,
			'longitude': $scope.well.location.lng
		};
		$scope.map.zoom = 12;
		$scope.map.markers = [];
		var marker = {
			id : $stateParams.wellId,
			'coords': {
				'latitude': $scope.well.location.lat,
				'longitude': $scope.well.location.lng
			},
			'icon':{
				url: 'images/marker.png',
				scaledSize: new google.maps.Size(25, 30)
			}
		};
		$scope.map.markers.push(marker);
	};
})
.controller('WishingCtrl', function($scope, $stateParams, BlueCats) {
	$scope.init = function() {
		$scope.well = BlueCats.getWell($stateParams.wellId);
		$scope.map = {};
		$scope.map.control = {};
		$scope.map.center = {
			'latitude': $scope.well.location.lat,
			'longitude': $scope.well.location.lng
		};
		$scope.map.zoom = 12;
		$scope.map.markers = [];
		var marker = {
			id : $stateParams.wellId,
			'coords': {
				'latitude': $scope.well.location.lat,
				'longitude': $scope.well.location.lng
			},
			'icon':{
				url: 'images/marker.png',
				scaledSize: new google.maps.Size(25, 30)
			}
		};
		$scope.map.markers.push(marker);
	};
})
.controller('MakeWishCtrl', function($scope, BlueCats,$location) {
	$scope.makeWish = function(wishForm) {
		//var wishForm = $scope.wishForm;
		if (!wishForm.$invalid) {
			BlueCats.addWish($scope.well.id,$scope.wishStory);
			$location.path('/feed/'+$scope.well.id);
		}
	};
})
.controller('FeedCtrl', function($scope, $stateParams, BlueCats) {
	$scope.init = function() {
		$scope.well = BlueCats.getWell($stateParams.wellId);
		$scope.feed = [];
		$scope.map = {};
		$scope.map.control = {};
		$scope.map.center = {
			'latitude': $scope.well.location.lat,
			'longitude': $scope.well.location.lng
		};
		$scope.map.zoom = 12;
		$scope.map.markers = [];
		var marker = {
			id : $stateParams.wellId,
			'coords': {
				'latitude': $scope.well.location.lat,
				'longitude': $scope.well.location.lng
			},
			'icon':{
				url: 'images/marker.png',
				scaledSize: new google.maps.Size(25, 30)
			}
		};
		$scope.map.markers.push(marker);
		$scope.feed = $scope.well.feed;
	};
	$scope.getImageUrl = function(wish) {
		if (_.isNull(wish.imageUrl) || _.isUndefined(wish.imageUrl)) {
			return 'images/feed/southbank/sunset.jpg';
		} else {
			return wish.imageUrl;
		}
	};
})
.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
});
