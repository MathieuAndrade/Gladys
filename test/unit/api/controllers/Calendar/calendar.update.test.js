var request = require('supertest');
var validateCalendar = require('../../validator/calendarValidator.js');

describe('CalendarController', function() {
  describe('update', function() {
    it('should update a calendar', function(done) {
      var calendar = {
        color: '#f63525'
      };

      request(sails.hooks.http.app)
        .patch('/calendar/1?token=test')
        .send(calendar)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }

          validateCalendar(res.body);
          res.body.color.should.equal(calendar.color);
          done();
        });
    });
  });
});
