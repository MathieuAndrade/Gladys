var should = require('should');
var validateEventType = require('../../validator/eventTypeValidator.js');

describe('EventType', function() {

  describe('update', function() {
    
    it('should update eventType', function (done) {
        var eventType = {
            id: 1,
            name: 'THIS IS A TEST MAN, A TEST !'
        }
        
        gladys.eventType.update(eventType).then(function(result){
           validateEventType(result);
           result.name.should.equal(eventType.name);
           done();
        }).catch(function(err){
            done(err);
        });

    });
  
  });

});