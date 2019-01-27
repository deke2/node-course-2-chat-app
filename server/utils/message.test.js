var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
        it('should generate the correct message object', () => {

        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from,text});

        });
});

describe('generateLocationMessage', () => {
        it('should generate the correct message object', () => {
                var from = 'Admin';
                var latitude = 42.5947667;
                var longitude = -83.2005582;
                var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

                var message = generateLocationMessage(from, latitude, longitude);

                expect(message).toInclude({from, url});
                expect(message.createdAt).toBeA('number');
        });
});