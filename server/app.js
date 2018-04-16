var express = require('express');
var app = express();

app.use(express.static('../'));
var server = app.listen(7000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('Express app listening at http://%s:%s',host,port);
});