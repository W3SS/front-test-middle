(function () {
    'use strict';

    var app = angular.module('app');

    app.controller('MainCtrl', mainCtrl);

    mainCtrl.$inject = ['bookingService'];

    function mainCtrl(bookingService) {
            var vm = this;

            vm.getBookings = async () => {
                var promise = bookingService.getBooking();
                
                promise.then(
                    function (result) {
                        const data = await result.json();
                        const bookings = data
    
                        let _bookings = []
    
                        for (let i in bookings) {
                            if (bookings.lenght !== null) {
                                _bookings.push({
                                    destination: bookings[i].destination,
                                    outboundDate: bookings[i].outboundDate,
                                    inboundDate: bookings[i].inboundDate,
                                    thumb: bookings[i].thumb
                                })
                            }
                        }
    
                        return _bookings;
                    },
                    function (error) {
                        console.log(error);
                    });
            };
        }
})();