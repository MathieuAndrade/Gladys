
/**
 * CalendarEventController
 *
 * @description :: Server-side logic for managing Calendarevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Get event by day
    */

   index: function(req, res, next){
     var options = req.query;
     options.user = req.session.User;

      gladys.calendar.getEventsDates(options)
        .then((calendarEvents) =>  res.json(calendarEvents))
        .catch(next);
    },

    /**
     * Get all event
    */

   get: function(req, res, next){
    var options = req.query;
    options.user = req.session.User;

     gladys.calendar.getAllEvents(options)
       .then((calendarEvents) =>  res.json(calendarEvents))
       .catch(next);
    },

    /**
     * Create an calendar event
    */

    create: function(req, res, next){
      var options = req.body;
      options.user = req.session.User;

      gladys.calendar.createEvent(options)
          .then((calendarEvent) =>  res.status(201).json(calendarEvent))
          .catch(next);
    },

    /**
     * Update an calendar event
    */

    update: function(req, res, next){
        var options = req.body;
        options.id = req.params.id

        gladys.calendar.updateEvent(options)
            .then((calendarEvent) =>  res.json(calendarEvent))
            .catch(next);
    },

    /**
     * Delete an calendar event
    */

    delete: function(req, res, next){

        gladys.calendar.deleteEvent({id: req.params.id})
            .then((calendarEvent) =>  res.json(calendarEvent))
            .catch(next);
    },

};