var request = require('supertest');
var validateCalendar = require('../../validator/calendarValidator.js');

describe('CalendarController', function() {
  describe('get', function() {
    it('should get all calendars', function(done) {
      request(sails.hooks.http.app)
        .get('/calendar?token=test')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err); 
          }

          validateCalendar(res.body);
          done();
        });
    });
  });
});
