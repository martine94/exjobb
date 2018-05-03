var assert = require('chai').assert;
var scriptCode = require('./script');

//console.log(scriptCode.testFunc('q'));

describe('Tests', function(){
    it('should return x', function(){
        assert.equal( scriptCode.testFunc('x'), 'x');
    });

    it('should return y', function(){
        assert.equal( scriptCode.testFunc('something else'), 'y');
    });
});
