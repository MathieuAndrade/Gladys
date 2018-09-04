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
    vm.dayEvents = [];
    vm.allEvents = [];
    vm.loadAllEvents = loadAllEvents;

    vm.activateCalendar = activateCalendar;

    activate();

    function activate() {
      getLanguageCurrentUser()
      .then(function(language){
        activateCalendar(language);
      });
      loadAllEvents();
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

  }
})();