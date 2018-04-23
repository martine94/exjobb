var assert = require('chai').assert;
var mongoCode = require('./mongo');

//Creating test db database
var myaccounts = [
{ _user: 'test', password: 'test'},
{ _user: 'b', password: 'b'},
{ _user: 'c', password: 'c'},
{ _user: 'd', password: 'd'},
{ _user: 'e', password: 'e'},
{ _user: 'f', password: 'f'},
{ _user: 'g', password: 'g'},
{ _user: 'h', password: 'h'},
{ _user: 'i', password: 'i'},
{ _user: 'j', password: 'j'}
];

//Function to populate db 

function createTestDb(content, func)
{
    for(stuff in content)
    {
        func(content[stuff]);
    }
}

createTestDb(myaccounts, mongoCode.addCompany);

describe('Testing mongo server', function(){
it('Should be equal to 1 when logging in as company and 0 when incorrect pass/username', function(){
    mongoCode.login("company", "test", "test", function(result){
        assert.equal(result.lenght, 1);
        
        
    });
    mongoCode.login("company", "wrong", "user", function(result){
        assert.equal(result.lenght, 0);       
    });
});

});


