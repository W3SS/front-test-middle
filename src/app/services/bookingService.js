(function() {
    'use strict';

    var app = angular.module('app');

    app.factory('BookingService', bookingService);

    function bookingService($http) {
        return {
            getBooking: function() {
                var url = 'https://5ba412108da2f20014654cf8.mockapi.io/api/v1/flights';
                
                return $http.get(url);
            }
        }
    }
})();