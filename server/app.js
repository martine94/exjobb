var express = require('express');
var app = express();

//app.use(express.static('../'));
app.use(express.static('../'))
app.get('/get_test',function(req,resp){
    console.log("GET request");
    resp.send('Nothing to GET');
});
app.post('/post_test',function(req,resp){
    console.log("POST request");
    resp.send('Nothing to post yet');
});

var server = app.listen(7000,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('Express app listening at http://%s:%s',host,port);
});