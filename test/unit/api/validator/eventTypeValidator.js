module.exports = validate;

var should = require('should');

function validate(eventType) {
	if(eventType instanceof Array) {
		eventType.forEach(validateEventType);
	} else {
		validateEventType(eventType);
	}
}

function validateEventType(eventType) {
	eventType.should.be.instanceOf(Object);
	eventType.should.have.property('code');
	eventType.should.have.property('name');
	eventType.should.have.property('description');
	eventType.should.have.property('category');
	eventType.should.have.property('service');
	eventType.should.have.property('faIcon');
	eventType.should.have.property('iconColor');
	eventType.should.have.property('user');
}