/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
 (function () {
  'use strict';

  angular
    .module('gladys')
    .controller('calendarCtrl', calendarCtrl);

  calendarCtrl.$inject = ['calendarService', 'userService'];

  function calendarCtrl(calendarService, userService) {
    /* jshint validthis: true */
    var vm = this;
    vm.user = 1;
    vm.allEvents = [];
    vm.allCalendars = []
    vm.newCalendar;

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
      getCalendars()
      return ;
    }

    function getLanguageCurrentUser(){
      return userService.whoAmI()
        .then(function(user){
           vm.user = user.id;
           return user.language.substring(0,2).toLowerCase();;
        }); 
    }

    function activateCalendar(language) {
      $("#calendar").fullCalendar({
        header    : {
          left  : 'prev,next today',
          center: 'title',
          right : 'month,agendaWeek,agendaDay,listWeek'
        },
        locale: language,
        editable: true,
        droppable: true,
      })
    }

    function getCalendars(){
      return calendarService.getCalendars()
        .then(function(data){
          vm.allCalendars = data.data
        })
    }

    function createCalendar(calendar){

      // Set defaut values
      calendar.active = 1
      calendar.service = 'gladys'
      calendar.externalid = generateUuid()

      if(!calendar.color) calendar.color = '#3c8dbc'

      return calendarService.createCalendar(calendar)
        .then(function(){
          getCalendars()
        })
        .catch(function(){
          notificationService.errorNotificationTranslated('DEFAULT.ERROR');
        });
    }

    function updateCalendar(calendar){

      if(!calendar.color) calendar.color = '#3c8dbc'
      
      return calendarService.updateCalendar(calendar.id, calendar)
        .then(function(){
          getCalendars()
        })
        .catch(function(){
          notificationService.errorNotificationTranslated('DEFAULT.ERROR');
        });
    }

    function changeCalendarState(calendar){
      calendar.active = !calendar.active
      updateCalendar(calendar)
    }

    function deleteCalendar(calendar){
      return calendarService.destroyCalendar(calendar.id)
        .then(function(){
          getCalendars()
        })
    }

    function loadAllEvents() {
      return calendarService.loadAllEvents()
        .then(function(data){
          vm.allEvents = data.data;

          var events = new Array()

          for(var i = 0; i < vm.allEvents.length; i++ ){

            var event = new Object()

            event.id = vm.allEvents[i].id
            event.title = vm.allEvents[i].name
            event.start = vm.allEvents[i].start
            event.end = vm.allEvents[i].end
            event.allDay = vm.allEvents[i].fullday ? true : false 
            event.color = '#3c8dbc'

            events.push(event)

          }
          $('#calendar').fullCalendar('addEventSource', events)

        });
    }

    function generateUuid(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

  }
})();