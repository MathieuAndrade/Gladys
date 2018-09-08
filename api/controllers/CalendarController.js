
/**
 * CalendarController
 *
 * @description :: Server-side logic for managing Calendarevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Get all calendars
    */

    index: function(req, res, next){
        var options = req.query;
        options.user = req.session.User;

        gladys.calendar.get(options)
            .then((calendars) =>  res.json(calendars))
            .catch(next);
    },

    /**
     * Create calendars
    */

    create: function(req, res, next){
        var options = req.body;
        options.user = req.session.User;

        gladys.calendar.create(options)
            .then((calendars) =>  res.status(201).json(calendars))
            .catch(next);
    },

    /**
     * Update an calendar
    */

    update: function(req, res, next){
        var options = req.body;
        options.id = req.params.id

        gladys.calendar.update(options)
            .then((calendar) =>  res.json(calendar))
            .catch(next);
    },

    /**
     * Delete an calendar
    */

    delete: function(req, res, next){

        gladys.calendar.delete({id: req.params.id})
            .then((calendar) =>  res.json(calendar))
            .catch(next);
    },

};