
/**
 * @apiDefine CalendarSuccess
 * @apiSuccess {Integer} id  Calendar id
 * @apiSuccess {uuid} externalid  Calendar unique id
 * @apiSuccess {String} name  The name of the calendar
 * @apiSuccess {String} description  The description of the calendar
 * @apiSuccess {String} service  The calendar service
 * @apiSuccess {integer} user The user id
 * @apiSuccess {String} color  The calendar color
 * @apiSuccess {integer} active  If the calendar is active (UI)
 */

/**
 * @apiDefine CalendarParam
 * @apiParam {uuid} externalid  Calendar unique id
 * @apiParam {String} name  The name of the calendar
 * @apiParam {String} description  The description of the calendar
 * @apiParam {String} service  The calendar service
 * @apiParam {String} color  The calendar color
 * @apiParam {integer} active  If the calendar is active (UI)
 */

module.exports = {

  /**
   * @api {get} /calendar get all calendars
   * @apiName GetCalendars
   * @apiGroup Calendar
   * @apiPermission authenticated
   *
   * @apiUse CalendarSuccess
   */

  index: function(req, res, next){
    var options = req.query;
    options.user = req.session.User;

    gladys.calendar.get(options)
      .then((calendars) =>  res.json(calendars))
      .catch(next);
  },

  /**
   * @api {post} /calendar create a calendar
   * @apiName createCalendar
   * @apiGroup Calendar
   * @apiPermission authenticated
   *
   * @apiUse CalendarParam
   *
   * @apiUse CalendarSuccess
   */

  create: function(req, res, next){
    var options = req.body;
    options.user = req.session.User;

    gladys.calendar.create(options)
      .then((calendars) =>  res.status(201).json(calendars))
      .catch(next);
  },

  /**
   * @api {patch} /calendar/:id update a calendar
   * @apiName updateCalendar
   * @apiGroup Calendar
   * @apiPermission authenticated
   *
   * @apiUse CalendarParam
   *
   * @apiUse CalendarSuccess
   */

  update: function(req, res, next){
    var options = req.body;
    options.id = req.params.id;

    gladys.calendar.update(options)
      .then((calendar) =>  res.json(calendar))
      .catch(next);
  },

  /**
   * @api {delete} /calendar/:id delete a calendar
   * @apiName deleteCalendar
   * @apiGroup Calendar
   * @apiPermission authenticated
   *
   */

  delete: function(req, res, next){

    gladys.calendar.delete({id: req.params.id})
      .then((calendar) =>  res.json(calendar))
      .catch(next);
  },

};