
(function () {
    'use strict';

    angular
        .module('gladys')
        .factory('calendarService', calendarService);

    calendarService.$inject = ['$http'];

    function calendarService($http) {
        var service = {
            loadEvents: loadEvents,
            loadAllEvents: loadAllEvents,
            createCalendarEvent: createCalendarEvent,
            updateCalendarEvent: updateCalendarEvent,
            destroyCalendarEvent: destroyCalendarEvent,
            getCalendars: getCalendars,
            createCalendar: createCalendar,
            updateCalendar: updateCalendar,
            destroyCalendar: destroyCalendar
        };

        return service;

        function loadEvents(date) {
            var start = new Date(date);
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            var end = new Date(date);
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);


            return $http({method: 'GET', url: '/calendarevent', params: {start: start, end: end} });
        }
        
        // All about calendar events 

        function loadAllEvents() {
            return $http({method: 'GET', url: '/calendarevent/all'});
        }

        function createCalendarEvent(calendar) {
            return $http({method: 'POST', url: '/calendarevent', data: calendar});
        }
        
        function destroyCalendarEvent(id){
            return $http({method: 'DELETE', url: '/calendarevent/' + id});
        }
        
        function updateCalendarEvent(id, calendar) {
            return $http({method: 'PATCH', url: '/calendarevent/' + id, data: calendar});
        }
        
        // All about calendars 
    
        function getCalendars() {
            return $http({method: 'GET', url: '/calendar' });
        }
        
        function createCalendar(calendar) {
            return $http({method: 'POST', url: '/calendar', data: calendar});
        }
        
        function destroyCalendar(id){
            return $http({method: 'DELETE', url: '/calendar/' + id});
        }
        
        function updateCalendar(id, calendar) {
            return $http({method: 'PATCH', url: '/calendar/' + id, data: calendar});
        }
    }
})();