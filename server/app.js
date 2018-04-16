var express = require('express');
var app = express();

app.use(express.static('../'))
app.get('/app_get', function (req, resp) {
    console.log("GET request");
    resp.send('Nothing to GET');
});
app.post('/app_post', function (req, resp) {
    console.log("POST request");
    resp.send('Nothing to post yet');
});

app.delete('/app_delete', function (req, resp) {
    console.log("Delete request");
    resp.send("Delete request sent");
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express app listening at http://%s:%s', host, port);
});

server.on('connection',conn=>{
    console.log("Connection recieved");
});