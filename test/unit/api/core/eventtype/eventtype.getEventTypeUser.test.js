var should = require('should');
var validateEventType = require('../../validator/eventTypeValidator.js');

describe('EventType', function() {

  describe('getEventTypeUser', function() {
    
    it('should return eventType of one user', function (done) {
          
        var options = {
            user : {
                id : 1
            }
        }
        
        gladys.eventType.getEventTypeUser(options)
            .then(function(result){
                validateEventType(result);
                done();
            }).catch(done);
    });
    
  });

});