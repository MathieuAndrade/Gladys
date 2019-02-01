var request = require('supertest');
var validateCalendar = require('../../validator/calendarValidator.js');

describe('CalendarController', function() {
  describe('create', function() {
    it('should create a calendar', function(done) {
      var calendar = {
        code: 'test',
        description: 'This is a test',
        service: 'gladystest',
        active: 1,
        externalid: 'f5a4a31c-ef7b-4324-94a6-d7c813fed661',
        color: '#f63525'
      };

      request(sails.hooks.http.app)
        .post('/calendar?token=test')
        .send(calendar)
        .expect(201)
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
