/**
 * @public
 * @description This function update an eventType
 * @name gladys.eventType.update
 * @param {Object} eventType
 * @param {integer} eventType.id The id of eventType
 * @param {String} eventType.code The code of eventType, it must be unique
 * @param {String} eventType.name The name of eventType
 * @param {String} eventType.description The description of eventType
 * @param {String} eventType.category The category of eventType
 * @param {String} eventType.service The service of eventType
 * @param {String} eventType.faIcon The faIcon of eventType
 * @param {String} eventType.iconColor The iconColor of eventType
 * @param {User} eventType.user The id of the eventType's user
 * @returns {EventType} eventType
 * @example
 * @example
 * var eventType = {
 *      id: 10,
 *      code: "back-at-home",
 *      name: "Back at Home",
 *      description: "User is back at home",
 *      category: "user", 
 *      service: "0",
 *      faIcon: "fa fa-home",
 *      iconColor: "bg-light-blue",
 *      user: 1
 * }
 *
 * gladys.eventType.update(eventType)
 *      .then(function(eventType){
 *         // eventType updated ! 
 *      })
 *      .catch(function(err){
 *          // something bad happened ! :/
 *      });
 */


module.exports = function(eventType){
    var id = eventType.id;
    delete eventType.id;
    return EventType.update({id}, eventType)
       .then(function(eventTypes){
          if(eventTypes.length){
              return eventTypes[0];
          } else {
              return Promise.reject(new Error('NotFound'));
          }
       });
 }