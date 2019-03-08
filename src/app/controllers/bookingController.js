(function () {
    'use strict';

    var app = angular.module('app');

    mainCtrl.$inject = ['bookingService'];

    app.component('heroDetail', {
        templateUrl: 'heroDetail.html',
        bindings: {
            destination: '',
            outboundDate: '',
            inboundDate: '',
            thumb: ''
        }
      });

})();