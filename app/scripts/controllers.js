'use strict';
angular.module('WishpointApp.controllers', [])

.controller('MapCtrl', ['$scope','BlueCats',function($scope,BlueCats) {
	$scope.beacons = BlueCats.allBeacons();
	$scope.$on('bc_receivedevent', function(event,data) {
		console.log(data);
		$scope.eventReceived = data.msg;
	}, true);
}])

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
