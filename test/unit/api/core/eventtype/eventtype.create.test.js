var should = require('should');
var validateEventType = require('../../validator/eventTypeValidator.js');

describe('EventType', function() {

  describe('create', function() {
    
    it('should return eventType created', function (done) {
        var eventType = {
             code: "on-the-way-to-home",
             name: "On the way to home",
             description: "User is on the way to home",
             category: "user", 
             service: "0",
             faIcon: "fa fa-car",
             iconColor: "bg-light-blue",
             user: 1 
        }
        
        gladys.eventType.create(eventType).then(function(result){
           validateEventType(result);
           done();
        }).catch(function(err){
            done(err);
        });

    });
  
  });

});