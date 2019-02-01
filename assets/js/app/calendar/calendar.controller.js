  
(function () {
  'use strict';

  angular
    .module('gladys')
    .controller('calendarCtrl', calendarCtrl);

  calendarCtrl.$inject = ['calendarService', 'userService', '$scope'];

  function calendarCtrl(calendarService, userService, $scope) {
    /* jshint validthis: true */
    var vm = this;
    vm.user = 1;
    vm.allEvents = [];
    vm.allCalendars = [];
    vm.newCalendar = {};
    vm.selectedCalendar = {};

    vm.loadAllEvents = loadAllEvents;
    vm.createCalendar = createCalendar;
    vm.updateCalendar = updateCalendar;
    vm.changeCalendarState = changeCalendarState;
    vm.deleteCalendar = deleteCalendar;
    vm.activateCalendar = activateCalendar;

    activate();

    function activate() {
      getLanguageCurrentUser()
        .then(function(language){
          activateCalendar(language);
        });
      loadAllEvents();
      getCalendars();
      return ;
    }

    function getLanguageCurrentUser(){
      return userService.whoAmI()
        .then(function(user){
          vm.user = user.id;
          return user.language.substring(0, 2).toLowerCase();;
        }); 
    }

    function activateCalendar(language) {
      $('#calendar').fullCalendar({
        header    : {
          left  : 'prev,next today',
          center: 'title',
          right : 'month,agendaWeek,agendaDay,listWeek'
        },
        locale: language,
        editable: true,
        droppable: true,
      });
    }

    function getCalendars(){
      return calendarService.getCalendars()
        .then(function(data){
          vm.allCalendars = data.data;
        });
    }

    function createCalendar(calendar){

      // Set default values
      calendar.active = 1;
      calendar.service = 'gladys';
      calendar.externalid = generateUuid();

      if(!calendar.color || calendar.color == '') { 
        calendar.color = '#3c8dbc'; 
      }

      if(isInt(calendar.color)){
        calendar.color = (calendar.color).toString(16);
      }

      return calendarService.createCalendar(calendar)
        .then(function(data){
          vm.allCalendars.push(data.data[0]);
          resetNewCalendarFields();
        })
        .catch(function(){
          notificationService.errorNotificationTranslated('DEFAULT.ERROR');
        });
    }

    function updateCalendar(calendar){

      if(!calendar.color || calendar.color == '') {
        calendar.color = '#3c8dbc';
      }

      if(isInt(calendar.color)){
        calendar.color = (calendar.color).toString(16);
      }
      
      return calendarService.updateCalendar(calendar.id, calendar)
        .then(function(){
          loadAllEvents();
          resetSelectedCalendarFields();
        })
        .catch(function(){
          notificationService.errorNotificationTranslated('DEFAULT.ERROR');
        });
    }

    function changeCalendarState(calendar){
      calendar.active = !calendar.active;
      updateCalendar(calendar);
    }

    function deleteCalendar(calendar){
      return calendarService.destroyCalendar(calendar.id)
        .then(function(){
          getCalendars();
        });
    }

    function loadAllEvents() {
      return calendarService.loadAllEvents()
        .then(function(data){
          $('#calendar').fullCalendar('removeEventSources');
          vm.allEvents = data.data;

          var events = new Array();

          for(var i = 0; i < vm.allEvents.length; i++ ){

            var event = new Object();

            event.id = vm.allEvents[i].id;
            event.title = vm.allEvents[i].name;
            event.start = vm.allEvents[i].start;
            event.end = vm.allEvents[i].end;
            event.allDay = vm.allEvents[i].fullday ? true : false; 
            event.color = vm.allEvents[i].color;

            events.push(event);

          }
          $('#calendar').fullCalendar('addEventSource', events);

        });
    }

    function generateUuid(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    function resetNewCalendarFields() {
      vm.newCalendar = {};
    }

    function resetSelectedCalendarFields() {
      vm.selectedCalendar = {};
    }

    function isInt(value) {
      return !isNaN(value) && (function(x) {
        return (x | 0) === x; 
      })(parseFloat(value));
    }

  }
})();