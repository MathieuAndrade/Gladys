var should = require('should');
var validateArea = require('../../validator/eventTypeValidator.js');

describe('EventType', function() {

  describe('delete', function() {
    
    it('should delete eventType', function (done) {
           
          gladys.eventType.delete({id: 1})
                .then(function(result){
                    done();
                })
                .catch(done);
    });
    
     
    
  });

});