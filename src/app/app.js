(function () {
	'use strict';
	
	var app = angular.module('app',['ngResource']);
	
	app.controller('MainCtrl', MainCtrl);
	
	app.factory("flights", function($resource) {
		return $resource("https://5ba412108da2f20014654cf8.mockapi.io/api/v1/flights");
	});
	
	function MainCtrl(flights, $scope) {
		$scope.title = 'My Bookings';
		flights.query(function(data) {
			$scope.flights = data;
		}, function(err) {
			console.error("Error occured: ", err);
		});
    }

})();