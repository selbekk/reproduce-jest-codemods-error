import expect from 'expect.js';

const multiply = (a, b) => a * b;

describe('test suite', () => {
    it('puts 2 and 2 together', () => {
        expect(multiply(2, 2)).to.be(4);
    });
    it('throws an error if given non-numbers', () => {
        expect(multiply).withArgs({}, 'not a number').to.throwError();
    });
});