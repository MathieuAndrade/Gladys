var queries = require('./eventType.queries.js');

/**
 * @public
 * @description This function delete an eventType
 * @name gladys.eventType.delete
 * @param {Object} eventType
 * @param {integer} eventType.id The id of the eventType
 * @returns {EventType} eventType
 * @example
 * var eventType: {
 *      id: 1
 * };
 * 
 * gladys.eventType.delete(eventType)
 *      .then(function(eventType){
 *         // eventType deleted ! 
 *      })
 *      .catch(function(err){
 *          // something bad happened ! :/
 *      });
 */

module.exports = function(eventType){
    return gladys.utils.sql(queries.delete, [eventType.id]);
};