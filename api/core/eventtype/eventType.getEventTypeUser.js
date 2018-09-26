var queries = require('./eventType.queries.js');

/**
 * @public
 * @description This function return all eventTypes of one user
 * @name gladys.eventType.getEventTypeUser
 * @returns {Array<eventType>} eventType
 * @example
 * var options = {
 *     user : {
 *         id : 1
 *     }
 * }
 * gladys.eventType.getEventTypeUser()
 *      .then(function(eventTypes){
 *          // do something
 *      })
 */

module.exports = function(options){
  return gladys.utils.sql(queries.getEventTypeUser, [options.user.id]);  
};