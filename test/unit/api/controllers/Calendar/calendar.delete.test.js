var request = require('supertest');

describe('CalendarController', function() {
  describe('delete', function() {
    it('should delete a calendar', function(done) {
      request(sails.hooks.http.app)
        .delete('/calendar/1?token=test')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err); 
          }

          done();
        });
    });
  });
});
